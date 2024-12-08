from django.shortcuts import get_object_or_404
from ninja_extra import api_controller, route, status, throttle
from ninja_extra.exceptions import NotFound
from ninja_extra.pagination import paginate
from ninja_extra.permissions import IsAdminUser, IsAuthenticated
from ninja_jwt.authentication import JWTAuth
from ninja_extra.schemas import NinjaPaginationResponseSchema

from api.models import Categoria
from api.schemas import CategoriaIn, QuestaoOut, IdSchema, OkSchema, ErrorSchema

from .base import ModelController


@api_controller(
    "/categoria",
    tags=["categoria"],
    auth=JWTAuth(),
    permissions=[IsAuthenticated],
)
class CategoriaController(ModelController):
    model = Categoria
    SchemaIn = CategoriaIn
    SchemaOut = QuestaoOut

    @route.get(
        "/",
        response=NinjaPaginationResponseSchema[SchemaOut],
        url_name="categoria-list",
    )
    @paginate()
    @throttle
    def get_questoes(self):
        return self.get_queryset()

    @route.get("/{id}/", response=SchemaOut, url_name="categoria-detail")
    def get_questao(self, id: int):
        return get_object_or_404(self.model, id=id)

    @route.post("/", response={200: SchemaOut, 400: ErrorSchema}, url_name="categoria-create")
    def create_questao(self, request, payload: CategoriaIn):
        categoria_data = payload.model_dump()
        questao_model = self.model.objects.create(**categoria_data)
        return questao_model
