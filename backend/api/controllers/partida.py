
from django.shortcuts import get_object_or_404
from ninja_extra import api_controller, route
from api.controllers.base import ModelController
from ninja_jwt.authentication import JWTAuth
from ninja_extra.permissions import IsAdminUser, IsAuthenticated

from api.models import partida
from api.models.partida import Partida
from api.models.questionario import Questionario
from api.schemas.helpers import ErrorSchema
from api.schemas.partida import PartidaIn, PartidaOut


@api_controller(
    "/partida",
    tags=["partida"],
    auth=JWTAuth(),
    permissions=[IsAuthenticated],
)
class PartidaController(ModelController):
    model = Partida
    SchemaOut = PartidaOut
    SchemaIn = PartidaIn

    # @route.post("/", response={200: SchemaOut, 400: ErrorSchema})
    # def create_questao(self, request, payload: SchemaIn):

    @route.post("/", response={200: SchemaOut, 400: ErrorSchema}, url_name="partida-create")
    def create_partida(self, request, payload: SchemaIn):
        questionario = get_object_or_404(
            Questionario, id=payload.questionario_id)

        partida = self.model.objects.create(
            questionario=questionario, created_by=request.user)

        print(request)

        return partida
