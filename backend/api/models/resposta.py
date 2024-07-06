from django.db import models

from .common import Common
from .participante import Participante
from .partida import Partida
from .pergunta import Pergunta
from .alternativa import Alternativa


class Resposta(Common):
    pontuacao = models.IntegerField(null=True, blank=True)
    participante = models.ForeignKey(
        Participante, on_delete=models.SET_NULL, null=True, blank=True)
    pergunta = models.ForeignKey(
        Pergunta, on_delete=models.SET_NULL, null=True, blank=True)

    # escolha = models.ForeignKey(Alternativa)
