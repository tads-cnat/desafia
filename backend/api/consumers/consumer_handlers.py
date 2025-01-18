from abc import ABC, abstractmethod
import json

from api.enums import is_valid_game_state
from api.models.alternativa import Alternativa
from api.models.questao import Questao
from api.models.resposta import Resposta
from asgiref.sync import sync_to_async
from datetime import datetime
from api.enums import GameState


class BaseHandler(ABC):
    @abstractmethod
    async def handle(self, consumer, data):
        pass


class NicknameHandler(BaseHandler):
    async def handle(self, consumer, data):
        nickname = data.get("nickname")
        if not nickname:
            await consumer.send(text_data=json.dumps({"error": "Nickname is required"}))
            return

        consumer.scope['participante'].objects.update(nome=nickname)
        print(f"Nickname setted: {nickname}")

        await consumer.send(text_data=json.dumps({
            "message": "Nickname successfully set!",
            "nickname": nickname
        }))


class AnswerHandler(BaseHandler):
    async def handle(self, consumer, data):
        resposta_id = data.get("resposta_id")
        questao_id = data.get("questao_id")

        if not resposta_id or not questao_id:
            await consumer.send(text_data=json.dumps({"error": "Resposta id e Questão id são obrigatórios"}))
            return

        participante = consumer.participante

        # Obter a alternativa e a questão
        escolha = await sync_to_async(Alternativa.objects.get)(id=resposta_id)
        questao = await sync_to_async(Questao.objects.get)(id=questao_id)

        # Verificar o timestamp armazenado em memória
        question_answer_timestamp = consumer.question_answer_timestamp
        if not question_answer_timestamp:
            await consumer.send(text_data=json.dumps({
                "error": "Tempo inicial para a questão não está definido."
            }))
            return

        tempo_decorrido = (
            datetime.now() - question_answer_timestamp).total_seconds()

        pontuacao_base = 1000

        if escolha.correta:
            penalidade = min(tempo_decorrido * 10, pontuacao_base)
            pontuacao = pontuacao_base - penalidade

        else:
            pontuacao = 0

        # Criar a resposta
        resposta = await sync_to_async(Resposta.objects.create)(
            participante=participante,
            escolha=escolha,
            questao=questao,
            pontuacao=pontuacao
        )

        # Enviar mensagem de sucesso
        await consumer.send(text_data=json.dumps({
            "type": "broadcast_message",
            "message": {
                "event": GameState.RESULTS_SHOWING,
                "target": "player",
                "resposta_id": resposta_id,
                "pontuacao": pontuacao,
                "correta": escolha.correta,
            },
        }))


class ChangeStateHandler(BaseHandler):
    async def handle(self, consumer, data):
        state = data.get("state")
        target = data.get("target")

        if not state:
            await consumer.send(text_data=json.dumps({"error": "New State is required"}))
            return

        if not is_valid_game_state(state):
            await consumer.send(text_data=json.dumps({"error": f'"{state}" is not a valid state'}))
            return

        if state == GameState.QUESTION_ANSWER.value:

            pass

        user_id = consumer.scope['user'].id
        created_by_id = consumer.partida.created_by_id

        if user_id == created_by_id:
            await consumer.channel_layer.group_send(consumer.room_group_name, {
                "type": "broadcast_message",
                "message": {"event": state, "player": None, "target": target}
            })
        else:
            await consumer.send(text_data=json.dumps({"error": "Only the creator can change the state"}))
