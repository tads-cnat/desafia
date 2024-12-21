import uuid
from ninja import Schema

from api.schemas.questionario import QuestionarioOut


class PartidaIn(Schema):
    questionario_id: int


class PartidaOut(Schema):
    id: uuid.UUID
    questionario: QuestionarioOut
