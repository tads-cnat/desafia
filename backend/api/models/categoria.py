from django.db import models
from .common import Common


class Categoria(Common):
    nome = models.CharField(max_length=200)

    def __str__(self):
        return self.nome
