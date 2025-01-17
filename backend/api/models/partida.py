import uuid

from django.db import models

from api.models.questao import Questao
from .common import Common

from .questionario import Questionario


class Partida(Common):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    questionario = models.ForeignKey(
        Questionario, on_delete=models.SET_NULL, null=True, blank=True)
    codigo_acesso = models.CharField(max_length=6)
    ativa = models.BooleanField(default=True)
    questao_atual = models.ForeignKey(
        Questao, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return str(self.id)
