from django.db import models
from .common import Common


class Questao(Common):
    enunciado = models.CharField(max_length=200)
    tempo_para_resposta = models.IntegerField(default=10)

    def __str__(self):
        return self.enunciado
