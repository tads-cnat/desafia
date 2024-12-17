from abc import ABC, abstractmethod
import json


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

        consumer.scope['nickname'] = nickname
        print(f"Nickname setted: {nickname}")

        await consumer.send(text_data=json.dumps({
            "message": "Nickname successfully set!",
            "nickname": nickname
        }))
