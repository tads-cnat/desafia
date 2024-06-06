from django.db import models
from .common import Common


class Pergunta(Common):
    enunciado = models.CharField(max_length=200)

    def __str__(self):
        return self.enunciado
