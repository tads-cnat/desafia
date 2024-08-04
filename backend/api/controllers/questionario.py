from django.shortcuts import get_object_or_404
from ninja_extra import api_controller, route, throttle
from ninja_extra.pagination import paginate
from ninja_extra.schemas import NinjaPaginationResponseSchema

from api.models import Questionario
from api.schemas import QuestionarioOut

from .base import ModelController


@api_controller(
    "/questionarios",
    tags=["questionarios"],
    # permissions=[IsAuthenticated],
    # auth=JWTAuth(),
)
class QuestionarioController(ModelController):
    model = Questionario
    SchemaOut = QuestionarioOut

    @route.get(
        "",
        response=NinjaPaginationResponseSchema[SchemaOut],
        url_name="questionario-list",
    )
    @paginate()
    @throttle
    def get_questoes(self):
        return self.get_queryset()

    @route.get("/{pk}/", response=SchemaOut, url_name="questionario-detail")
    def get_questionario(self, pk: int):
        return get_object_or_404(self.model, id=pk)
