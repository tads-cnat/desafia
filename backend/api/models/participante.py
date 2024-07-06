from django.db import models
from .common import Common


class Participante(Common):
    nome = models.TextField(max_length=300)
