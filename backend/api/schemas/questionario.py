import datetime
from ninja import ModelSchema, Schema
from typing import List

from api.schemas.categoria import CategoriaOut
from .questao import QuestaoOut
from .helpers import IdSchema
from api.models import Questionario


class QuestionarioOut(ModelSchema):
    id: int
    nome: str
    descricao: str
    categoria: CategoriaOut
    questoes: List[QuestaoOut]

    class Config:
        model = Questionario
        model_fields = ['id', 'nome', 'descricao', 'categoria',
                        'questoes', 'created_at', 'updated_at']


class QuestionarioIn(Schema):
    nome: str
    descricao: str
    categoria: IdSchema
    questoes_id: List[int]
