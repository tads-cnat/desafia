from ninja import ModelSchema
from api.models import Categoria


class CategoriaOut(ModelSchema):
    class Config:
        model = Categoria
        model_fields = ['id', 'nome']


class CategoriaIn(ModelSchema):
    class Config:
        model = Categoria
        model_fields = ['nome']
