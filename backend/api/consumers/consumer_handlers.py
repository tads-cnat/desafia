from abc import ABC, abstractmethod
import json

from api.models import participante
from api.models import resposta
from api.models.alternativa import Alternativa
from api.models.questao import Questao
from api.models.resposta import Resposta


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
        escolha = Alternativa.objects.get(id=resposta_id)
        questao = Questao.objects.get(id=questao_id)

        resposta = Resposta.objects.create(
            participante=participante,
            escolha=escolha,
            questao=questao,
            pontuacao=0
        )

        print(resposta)

        await consumer.send(text_data=json.dumps({
            "message": "Answer successfully set! Wait for the results!",
            "resposta_id": resposta_id
        }))
