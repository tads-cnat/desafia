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

        participante = consumer.scope['participante']
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
