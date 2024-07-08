from django.db import models

from .common import Common
from .questao import Questao


class Alternativa(Common):
    questao_relacionada = models.ForeignKey(
        Questao, related_name='alternativas', on_delete=models.CASCADE)
    texto = models.CharField(max_length=100)
    correta = models.BooleanField(default=False)

    def __str__(self):
        return self.texto
