from datetime import datetime
from ninja import Schema


class PerguntaIn(Schema):
    enunciado: str


class PerguntaOut(Schema):
    id: int
    enunciado: str
    created_at: datetime = None
    updated_at: datetime = None
