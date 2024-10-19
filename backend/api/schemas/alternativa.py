from ninja import ModelSchema
from api.models import Alternativa


class AlternativaOut(ModelSchema):
    class Config:
        model = Alternativa
        model_fields = ['id', 'texto', 'correta']


class AlternativaIn(ModelSchema):
    class Config:
        model = Alternativa
        model_fields = ['texto', 'correta']
