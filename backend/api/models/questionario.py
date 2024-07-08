from django.db import models
from .common import Common
from .questao import Questao


class Questionario(Common):
    nome = models.CharField(max_length=200)
    descricao = models.CharField(max_length=500)
    categoria = models.CharField(max_length=200)
    questoes = models.ManyToManyField(Questao)
