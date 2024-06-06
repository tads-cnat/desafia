from django.urls import path
from ninja import NinjaAPI
from api.views import *

api = NinjaAPI()

api.add_router("/", pergunta_view)

urlpatterns = [
    path("", api.urls),
]
