from django.db import models

from .common import Common
from .pergunta import Pergunta


class Alternativa(Common):
    pergunta_relacionada = models.ForeignKey(
        Pergunta, related_name='alternativas', on_delete=models.CASCADE)
    texto = models.CharField(max_length=100)
    correta = models.BooleanField(default=False)

    def __str__(self):
        return self.texto
