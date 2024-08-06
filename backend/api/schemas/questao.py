from datetime import datetime
from ninja import Schema
from typing import List
from .alternativa import AlternativaOut


class QuestaoIn(Schema):
    enunciado: str


class QuestaoOut(Schema):
    id: int
    enunciado: str
    alternativas: List[AlternativaOut]
    created_at: datetime = None
    updated_at: datetime = None
