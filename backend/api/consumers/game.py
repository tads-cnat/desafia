import json
from channels.generic.websocket import AsyncWebsocketConsumer

from api.consumers.consumer_handlers import NicknameHandler
from api.consumers.dispatcher import ActionDispatcher


class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.game_id = self.scope['url_route']['kwargs']['game_id']
        self.room_group_name = f"game_{self.game_id}"

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        self.dispatcher = ActionDispatcher()
        self.dispatcher.register_handler("set_nickname", NicknameHandler())

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            await self.dispatcher.dispatch(self, data)
        except json.JSONDecodeError:
            await self.send(text_data=json.dumps({
                "error": "Invalid data, expected JSON."
            }))

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))
