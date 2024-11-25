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

    @route.get(
        "/",
        response=NinjaPaginationResponseSchema[QuestaoOut],
        url_name="questao-list",
    )
    @paginate()
    @throttle
    def get_questoes(self, request, q: str = None):
        queryset = self.get_queryset()
        if q:
            queryset = queryset.filter(enunciado__icontains=q)
        return queryset

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

    @route.put("/{id}/", response={200: QuestaoOut, 400: ErrorSchema}, url_name="questao-update")
    def update_questao(self, id: int, payload: QuestaoIn):
        questao = get_object_or_404(
            self.model.objects.prefetch_related("alternativas"), id=id)
        questao_data = payload.dict()
        alternativas_data = questao_data.pop("alternativas", [])

        with transaction.atomic():
            for attr, value in questao_data.items():
                setattr(questao, attr, value)
            questao.save()

            existing_ids = [alt["id"]
                            for alt in alternativas_data if "id" in alt]
            questao.alternativas.exclude(id__in=existing_ids).delete()

            for alternativa in alternativas_data:
                if "id" in alternativa:
                    alternativa_model = questao.alternativas.get(
                        id=alternativa["id"])
                    for attr, value in alternativa.items():
                        setattr(alternativa_model, attr, value)
                    alternativa_model.save()
                else:
                    questao.alternativas.create(**alternativa)

        return questao

    @route.delete("/{id}/", response={200: OkSchema, 404: ErrorSchema}, url_name="questao-delete")
    def delete_questao(self, id: int):
        questao = get_object_or_404(self.model, id=id)
        questao.delete()
        return {"message": "Questão excluída com sucesso"}
