from abc import ABC, abstractmethod
import json

from django.utils.timezone import now
from api.enums import is_valid_game_state
from api.models.alternativa import Alternativa
from api.models.questao import Questao
from api.models.resposta import Resposta
from api.models.participante import Participante
from asgiref.sync import sync_to_async
from api.enums import GameState, Target


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

        await consumer.send(text_data=json.dumps({
            "message": "Nickname successfully set!",
            "nickname": nickname
        }))


class DisconnectHandler(BaseHandler):
    async def handle(self, consumer, data):
        user_id = consumer.scope['user'].id
        created_by_id = consumer.partida.created_by_id

        if not user_id == created_by_id:
            return

        id_participante = data.get("id_participante")
        if not id_participante:
            await consumer.send(text_data=json.dumps({"error": "id_participante is required"}))
            return

        try:
            participante = await sync_to_async(Participante.objects.get)(id=id_participante)
        except Participante.DoesNotExist:
            await consumer.send(text_data=json.dumps({"error": "Participante não encontrado"}))
            return

        channel_name = f"user_{participante.id}"
        all_channels = await consumer.channel_layer.group_channels(consumer.room_group_name)
        if channel_name not in all_channels:
            await consumer.send(text_data=json.dumps({"error": "Participante não está conectado"}))
            return

        await consumer.channel_layer.send(channel_name, {
            "type": GameState.DISCONNECTED.value,
            "message": "Você foi desconectado pelo administrador.",
        })

        await consumer.send(text_data=json.dumps({
            "message": f"Participante {id_participante} foi desconectado com sucesso."
        }))


class AnswerHandler(BaseHandler):
    async def handle(self, consumer, data):
        resposta_id = data.get("resposta_id")
        questao_id = data.get("questao_id")
        tempo_decorrido = data.get("elapsed_time")

        if not resposta_id or not questao_id:
            await consumer.send(text_data=json.dumps({"error": "Resposta id e Questão id são obrigatórios"}))
            return

        participante = consumer.participante

        escolha = await sync_to_async(Alternativa.objects.get)(id=resposta_id)
        questao = await sync_to_async(Questao.objects.get)(id=questao_id)

        pontuacao_base = 1000

        if escolha.correta:  # Escolher uma forma melhor de gerar a pontuação?
            penalidade = 1 - tempo_decorrido / \
                (questao.tempo_para_resposta * 1000)
            pontuacao = pontuacao_base*penalidade
        else:
            pontuacao = 0

        resposta = await sync_to_async(Resposta.objects.create)(
            participante=participante,
            escolha=escolha,
            questao=questao,
            pontuacao=pontuacao
        )

        participante.pontuacao_total += pontuacao
        await sync_to_async(participante.save)()

        await consumer.send(text_data=json.dumps({
            "type": "broadcast_message",
            "message": {
                "event": GameState.WAITING.value,
                "target": Target.PLAYERS.value,
                "resposta_id": resposta_id,
                "pontuacao": pontuacao,
                "correta": escolha.correta,
            },
        }))

        total_participantes = await sync_to_async(consumer.partida.participante_set.count)()
        total_respostas = await sync_to_async(Resposta.objects.filter(
            questao=questao,
            participante__partida=consumer.partida
        ).count)()

        if total_respostas >= total_participantes:
            await consumer.channel_layer.group_send(consumer.room_group_name, {
                "type": "broadcast_message",
                "message": {
                    "event": GameState.TIMES_UP.value,
                    "target": Target.ALL.value,
                    "questao_id": questao_id
                },
            })


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
