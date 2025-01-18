from abc import ABC, abstractmethod
import json

from django.utils.timezone import now
from api.enums import is_valid_game_state
from api.models.alternativa import Alternativa
from api.models.questao import Questao
from api.models.resposta import Resposta
from asgiref.sync import sync_to_async
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

        print("questao_id", questao_id)
        print("resposta_id", resposta_id)

        if not resposta_id or not questao_id:
            await consumer.send(text_data=json.dumps({"error": "Resposta id e Questão id são obrigatórios"}))
            return

        participante = consumer.participante

        escolha = await sync_to_async(Alternativa.objects.get)(id=resposta_id)
        questao = await sync_to_async(Questao.objects.get)(id=questao_id)

        question_answer_timestamp = consumer.partida.questao_atual_timestamp
        if not question_answer_timestamp:
            await consumer.send(text_data=json.dumps({
                "error": "Tempo inicial para a questão não está definido."
            }))
            return

        tempo_decorrido = (
            now() - question_answer_timestamp).total_seconds()

        pontuacao_base = 1000

        if escolha.correta:
            penalidade = min(tempo_decorrido * 10, pontuacao_base)
            pontuacao = pontuacao_base - penalidade
        else:
            pontuacao = 0

        resposta = await sync_to_async(Resposta.objects.create)(
            participante=participante,
            escolha=escolha,
            questao=questao,
            pontuacao=pontuacao
        )

        await consumer.send(text_data=json.dumps({
            "type": "broadcast_message",
            "message": {
                "event": GameState.RESULTS_SHOWING.value,
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
        payload = data.get("data")

        if not state:
            await consumer.send(text_data=json.dumps({"error": "New State is required"}))
            return

        if not is_valid_game_state(state):
            await consumer.send(text_data=json.dumps({"error": f'"{state}" is not a valid state'}))
            return

        print(f"Changing state to {state}")
        if data.get("state") == GameState.QUESTION_ANSWER.value:
            print(f"Setting question_answer_timestamp")
            partida = consumer.partida
            partida.questao_atual_timestamp = now()
            await sync_to_async(partida.save)()

        user_id = consumer.scope['user'].id
        created_by_id = consumer.partida.created_by_id

        if user_id == created_by_id:
            message = {"event": state}
            if target is not None:
                message["target"] = target
            if payload is not None:
                message["data"] = payload

            await consumer.channel_layer.group_send(consumer.room_group_name, {
                "type": "broadcast_message",
                "message": message,
            })
        else:
            await consumer.send(text_data=json.dumps({"error": "Only the creator can change the state"}))
