from django.db import models
from .usuario import Usuario


class Common(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        Usuario, on_delete=models.SET_NULL, blank=True, null=True)

    class Meta:
        abstract = True
