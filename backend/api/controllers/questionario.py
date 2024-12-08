from django.shortcuts import get_object_or_404
from ninja_extra import api_controller, route, throttle
from ninja_extra.pagination import paginate
from ninja_extra.permissions import IsAuthenticated
from ninja_jwt.authentication import JWTAuth
from typing import List
from ninja_extra.schemas import NinjaPaginationResponseSchema

from api.models import Questionario, Questao
from api.models.categoria import Categoria
from api.schemas import QuestionarioOut, QuestionarioIn, ErrorSchema

from .base import ModelController


@api_controller(
    "/questionario",
    tags=["questionario"],
    auth=JWTAuth(),
    permissions=[IsAuthenticated],
)
class QuestionarioController(ModelController):
    model = Questionario
    SchemaOut = QuestionarioOut
    SchemaIn = QuestionarioIn

    @route.get(
        "/",
        response=NinjaPaginationResponseSchema[SchemaOut],
        url_name="questionario-list",
    )
    @paginate()
    @throttle
    def get_questoes(self):
        return self.get_queryset()

    @route.get("/{id}/", response=SchemaOut, url_name="questionario-detail")
    def get_questionario(self, id: int):
        return get_object_or_404(self.model, id=id)

    @route.post("/", response={200: SchemaOut, 400: ErrorSchema})
    def create_questionario(self, payload: QuestionarioIn):

        categoria = Categoria.objects.get(id=payload.categoria_id)
        questionario = self.model.objects.create(
            nome=payload.nome,
            descricao=payload.descricao,
            categoria=categoria,
        )

        questoes = Questao.objects.filter(id__in=payload.questoes_id)
        questionario.questoes.set(questoes)

        return questionario

    @route.post("/{id}/questoes/", response={200: QuestionarioOut, 400: ErrorSchema})
    def add_questoes(self, request, id: int, payload: List[int]):
        questionario = get_object_or_404(Questionario, id=id)
        questoes = Questao.objects.filter(id__in=payload)
        questionario.questoes.add(*questoes)

        return questionario

    @route.delete("/{id}/questoes/", response={200: QuestionarioOut, 404: dict})
    def remove_questoes(self, request, id: int, payload: List[int]):
        questionario = get_object_or_404(Questionario, id=id)
        questoes = Questao.objects.filter(id__in=payload)
        questionario.questoes.remove(*questoes)

        return questionario
