from django.db import transaction
from django.shortcuts import get_object_or_404
from ninja_extra import api_controller, route, status, throttle
from ninja_extra.exceptions import NotFound
from ninja_extra.pagination import paginate
from ninja_extra.permissions import IsAdminUser, IsAuthenticated
from ninja_jwt.authentication import JWTAuth
from ninja_extra.schemas import NinjaPaginationResponseSchema

from api.models import Questao
from api.schemas import QuestaoIn, QuestaoOut, AlternativaIn, AlternativaOut, IdSchema, OkSchema, ErrorSchema

from .base import ModelController


@api_controller(
    "/questao",
    tags=["questao"],
    auth=JWTAuth(),
    permissions=[IsAuthenticated],
)
class QuestaoController(ModelController):
    model = Questao
    SchemaIn = QuestaoIn
    SchemaOut = QuestaoOut

    @route.get(
        "/",
        response=NinjaPaginationResponseSchema[SchemaOut],
        url_name="questao-list",
    )
    @paginate()
    @throttle
    def get_questoes(self):
        return self.get_queryset()

    @route.get("/{id}/", response=SchemaOut, url_name="questao-detail")
    def get_questao(self, id: int):
        return get_object_or_404(self.model, id=id)

    @route.post("/", response={200: SchemaOut, 400: ErrorSchema})
    def create_questao(self, request, payload: SchemaIn):
        questao_data = payload.dict()
        alternativas_data = questao_data.pop("alternativas", [])

        with transaction.atomic():
            questao_model = self.model.objects.create(**questao_data)

            for alternativa in alternativas_data:
                questao_model.alternativas.create(**alternativa)

        return questao_model

    @route.post("/{id}/alternativa/", response={200: AlternativaOut, 400: ErrorSchema})
    def create_alternativa(self, id: int, payload: AlternativaIn):
        alternativa_data = payload.model_dump()
        questao = get_object_or_404(self.model, id=id)
        alternativa_model = questao.alternativas.create(**alternativa_data)
        return alternativa_model
