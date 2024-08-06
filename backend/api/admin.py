from django.contrib import admin
from django.apps import apps
from api.models import *

app = apps.get_app_config('api')

for model in app.get_models():
    admin.site.register(model)
