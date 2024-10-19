from django.urls import path
from ninja_jwt.controller import NinjaJWTDefaultController
from ninja_extra import NinjaExtraAPI

from api.controllers import *

api = NinjaExtraAPI(
    title="PNP API",
    version="2.0.0",
    urls_namespace="pnp",
)


api.register_controllers(QuestaoController)
api.register_controllers(QuestionarioController)
api.register_controllers(AlternativaController)


api.register_controllers(NinjaJWTDefaultController)


urlpatterns = [
    path("", api.urls),
]
