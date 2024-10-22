

from django.urls import path
from api.consumers.game_consumer import GameConsumer


websocket_urlpatterns = [
    path('ws/game/<str:game_id>/', GameConsumer.as_asgi()),
]
