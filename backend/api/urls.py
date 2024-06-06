from django.urls import path
from ninja import NinjaAPI
from api.views import employee_view

api = NinjaAPI()

api.add_router("/api/", employee_view)

urlpatterns = [
    path("", api.urls),
]
