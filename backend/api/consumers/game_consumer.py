import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.forms import model_to_dict
from django.shortcuts import get_object_or_404

from api.consumers.consumer_handlers import AnswerHandler, ChangeStateHandler, NicknameHandler
from api.consumers.dispatcher import ActionDispatcher
from api.models.participante import Participante
from urllib.parse import parse_qs
from asgiref.sync import sync_to_async, async_to_sync
from channels.layers import get_channel_layer

from api.models.partida import Partida


class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.game_id = self.scope['url_route']['kwargs']['game_id']
        self.room_group_name = f"game_{self.game_id}"
        self.partida = await sync_to_async(get_object_or_404)(Partida, id=self.game_id)

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # Get the player_id from the query string
        query_params = parse_qs(
            self.scope.get('query_string', b'').decode('utf-8')
        )
        self.player_id = query_params.get('player_id', [None])[0]

        if self.player_id:
            participante = await sync_to_async(
                Participante.objects.get)(id=self.player_id)
            self.participante = participante

        # Check if the player is the creator of the game
        self.is_creator = self.partida.created_by_id == self.scope['user'].id

        print(self.scope['user'])

        await self.accept()

        if not self.is_creator:

            player = {
                "id": self.participante.id,
                "nome": self.participante.nome,
            }

            await self.channel_layer.group_send(self.room_group_name, {
                "type": "broadcast_message",
                "message": {"event": "player_joined", "player": player}
            })

        self.dispatcher = ActionDispatcher()
        self.dispatcher.register_handler("set_nickname", NicknameHandler())
        self.dispatcher.register_handler("set_answer", AnswerHandler())
        self.dispatcher.register_handler("change_state", ChangeStateHandler())

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

    async def broadcast_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

    async def send_message_creator(self, event):
        message = event['message']
        if self.is_creator:
            print("AQUI TB", message)
            await self.send(text_data=json.dumps({
                'message': message
            }))
