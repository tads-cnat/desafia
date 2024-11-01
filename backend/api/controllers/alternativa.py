from django.shortcuts import get_object_or_404
from ninja_extra import api_controller, route, status, throttle
from ninja_extra.exceptions import NotFound
from ninja_extra.pagination import paginate
from ninja_extra.permissions import IsAdminUser, IsAuthenticated
from ninja_jwt.authentication import JWTAuth
from ninja_extra.schemas import NinjaPaginationResponseSchema

from api.models import Alternativa
from api.schemas import AlternativaIn, QuestaoOut, IdSchema, OkSchema, ErrorSchema

from .base import ModelController


@api_controller(
    "/alternativa",
    tags=["alternativa"],
    auth=JWTAuth(),
    permissions=[IsAuthenticated],
)
class AlternativaController(ModelController):
    model = Alternativa
    SchemaIn = AlternativaIn
    SchemaOut = QuestaoOut

    @route.get(
        "/",
        response=NinjaPaginationResponseSchema[SchemaOut],
        url_name="alternativa-list",
    )
    @paginate()
    @throttle
    def get_questoes(self):
        return self.get_queryset()

    @route.get("/{id}/", response=SchemaOut, url_name="alternativa-detail")
    def get_questao(self, id: int):
        return get_object_or_404(self.model, id=id)

    @route.post("/", response={200: SchemaOut, 400: ErrorSchema}, url_name="alternativa-create")
    def create_questao(self, request, payload: AlternativaIn):
        alternativa_data = payload.model_dump()
        questao_model = self.model.objects.create(**alternativa_data)
        return questao_model
