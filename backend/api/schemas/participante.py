
import uuid
from ninja import Schema

from api.schemas.partida import PartidaOut


class ParticipanteIn(Schema):
    nome: str | None


class ParticipanteOut(Schema):
    id: int
    nome: str | None
    partida: PartidaOut
