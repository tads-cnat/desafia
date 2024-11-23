from datetime import datetime
from ninja import Schema
from typing import List
from .alternativa import AlternativaIn, AlternativaOut


class QuestaoIn(Schema):
    enunciado: str
    alternativas: List[AlternativaIn] | None


class QuestaoOut(Schema):
    id: int
    enunciado: str
    alternativas: List[AlternativaOut]
    created_at: datetime = None
    updated_at: datetime = None
