from django.db import models
from .categoria import Categoria
from .common import Common
from .questao import Questao


class Questionario(Common):
    nome = models.CharField(max_length=200)
    descricao = models.CharField(max_length=500)
    categoria = models.ForeignKey(
        Categoria, on_delete=models.SET_NULL, blank=True, null=True)
    questoes = models.ManyToManyField(Questao)
