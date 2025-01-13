
from typing import List
import uuid
from django.shortcuts import get_object_or_404
from ninja_extra import api_controller, paginate, route, throttle
from api.controllers.base import ModelController
from ninja_jwt.authentication import JWTAuth
from ninja_extra.permissions import IsAuthenticated, AllowAny
from ninja_extra.schemas import NinjaPaginationResponseSchema

from api.models import partida
from api.models.participante import Participante
from api.models.partida import Partida
from api.models.questionario import Questionario
from api.schemas.helpers import ErrorSchema, NameSchema, UuidSchema
from api.schemas.participante import ParticipanteIn, ParticipanteOut
from api.schemas.partida import PartidaIn, PartidaOut
from api.services.codigo_acesso import CodigoAcessoService


@api_controller(
    "/partida",
    tags=["partida"],
    auth=JWTAuth(),
    permissions=[IsAuthenticated]
)
class PartidaController(ModelController):
    model = Partida
    SchemaOut = PartidaOut
    SchemaIn = PartidaIn

    @route.get(
        "/",
        response=NinjaPaginationResponseSchema[SchemaOut],
        url_name="categoria-list",
    )
    @paginate()
    @throttle
    def get_questoes(self):
        return self.model.objects.filter(created_by=self.context.request.user)

    @route.post("/{id}/participante/", response={200: ParticipanteOut, 400: ErrorSchema}, url_name="participacao-create", auth=None, permissions=[AllowAny])
    def create_participante(self, id: uuid.UUID, payload: ParticipanteIn):

        partida = get_object_or_404(
            self.model, id=id, ativa=True)

        if Participante.objects.filter(partida=partida, nome=payload.nome).exists():
            return 400, {"message": "Já existe um participante com este nome na partida ativa."}

        participante = Participante.objects.create(
            partida=partida, nome=payload.nome, pontuacao_total=0)

        return participante

    @route.get("/{id}/participantes/", response={200: List[ParticipanteOut], 400: ErrorSchema}, url_name="participantes-partida-list", auth=None, permissions=[AllowAny])
    def list_partida_participantes(self, id: uuid.UUID):

        partida = get_object_or_404(
            self.model, id=id, ativa=True)

        participantes = partida.participante_set.all()

        return participantes

    @route.get("entrar/{codigo_acesso}/", response={200: UuidSchema, 400: ErrorSchema}, url_name="partida-join", auth=None, permissions=[AllowAny])
    def join_partida(self, codigo_acesso: str):
        partida = get_object_or_404(
            self.model, codigo_acesso=codigo_acesso, ativa=True)

        return {"id": partida.id}

    @route.post("/", response={200: SchemaOut, 400: ErrorSchema}, url_name="partida-create")
    def create_partida(self, request, payload: SchemaIn):
        questionario = get_object_or_404(
            Questionario, id=payload.questionario_id)

        codigo_acesso = CodigoAcessoService.gerar_codigo_unico()

        partida = self.model.objects.create(
            questionario=questionario, created_by=request.user, codigo_acesso=codigo_acesso)

        print(request)

        return partida
