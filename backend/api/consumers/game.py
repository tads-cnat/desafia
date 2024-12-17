import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync


class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.game_id = self.scope['url_route']['kwargs']['game_id']
        self.room_group_name = f"game_{self.game_id}"

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        body = text_data_json.get('nickname', 'Mensagem vazia')

        print(f"Mensagem recebida: {body}")

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat.message',
                'message': body,
            }
        )

    async def chat_message(self, event):
        message = event['message']

        # Envia a mensagem de volta para o cliente WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
