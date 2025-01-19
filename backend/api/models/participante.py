from django.db import models
from .common import Common
from .partida import Partida
from .usuario import Usuario


class Participante(Common):
    nome = models.TextField(max_length=300)
    pontuacao_total = models.IntegerField(null=True, blank=True)
    partida = models.ForeignKey(
        Partida, on_delete=models.SET_NULL, null=True, blank=True)
    jogando = models.BooleanField(default=True)
