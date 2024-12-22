import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.shortcuts import get_object_or_404

from api.consumers.consumer_handlers import AnswerHandler, ChangeStateHandler, NicknameHandler
from api.consumers.dispatcher import ActionDispatcher
from api.models.participante import Participante
from urllib.parse import parse_qs
from asgiref.sync import sync_to_async

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
        query_params = parse_qs(self.scope.get(
            'query_string', b'').decode('utf-8'))
        self.player_id = query_params.get('player_id', [None])[0]

        # Get the player object from the database
        participante = await sync_to_async(
            Participante.objects.get)(id=self.player_id)
        self.participante = participante

        # Check if the player is the creator of the game
        if self.partida.criador.id == self.player_id:
            self.is_creator = True
        else:
            self.is_creator = False

        await self.accept()

        if self.is_creator:
            await self.notify_creator(f"Player {self.participante} connected!")

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

    async def command(self, event):
        action = event['action']

        await self.send(text_data=json.dumps({
            'action': action
        }))
