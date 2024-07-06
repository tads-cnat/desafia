from django.db import models
from .common import Common

from .questionario import Questionario
from .usuario import Usuario


class Partida(Common):
    questionario = models.ForeignKey(
        Questionario, on_delete=models.SET_NULL, null=True, blank=True)
