from django.db import models
from .department import Department


class Employee(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    department = models.ForeignKey(
        Department, on_delete=models.CASCADE, blank=True, null=True)
    birthdate = models.DateField(null=True, blank=True)
    cv = models.FileField(null=True, blank=True)
