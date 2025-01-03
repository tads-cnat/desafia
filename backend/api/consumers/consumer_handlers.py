from abc import ABC, abstractmethod
import json

from api.models.alternativa import Alternativa
from api.models.questao import Questao
from api.models.resposta import Resposta
from asgiref.sync import sync_to_async


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
        if not resposta_id:
            await consumer.send(text_data=json.dumps({"error": "Resposta id is required"}))
            return

        participante = consumer.participante
        escolha = await sync_to_async(Alternativa.objects.get)(id=resposta_id)
        questao = await sync_to_async(Questao.objects.get)(id=questao_id)

        resposta = await sync_to_async(Resposta.objects.create)(
            participante=participante,
            escolha=escolha,
            questao=questao,
            pontuacao=0
        )

        await consumer.send(text_data=json.dumps({
            "message": "Answer successfully set! Wait for the results!",
            "resposta_id": resposta_id
        }))


class ChangeStateHandler(BaseHandler):
    async def handle(self, consumer, data):
        state = data.get("state")

        if not state:
            await consumer.send(text_data=json.dumps({"error": "New State is required"}))
            return

        user_id = consumer.scope['user'].id
        created_by_id = consumer.partida.created_by_id

        if user_id == created_by_id:
            await consumer.channel_layer.group_send(consumer.room_group_name, {
                "type": "broadcast_message",
                "message": {"event": state, "player": None}
            })
        else:
            await consumer.send(text_data=json.dumps({"error": "Only the creator can change the state"}))
