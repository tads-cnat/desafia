from ninja import ModelSchema
from typing import List
from .questao import QuestaoOut
from api.models import Questionario


class QuestionarioOut(ModelSchema):
    questoes: List[QuestaoOut]

    class Config:
        model = Questionario
        model_fields = ['id', 'nome', 'descricao', 'categoria', 'questoes']
