from django.shortcuts import get_object_or_404
from ninja_extra import api_controller, route, status, throttle
from ninja_extra.exceptions import NotFound
from ninja_extra.pagination import paginate
from ninja_extra.permissions import IsAdminUser, IsAuthenticated
from ninja_jwt.authentication import JWTAuth
from ninja_extra.schemas import NinjaPaginationResponseSchema

from api.models import Pergunta
from api.schemas import PerguntaIn, PerguntaOut, IdSchema, OkSchema, ErrorSchema

from .base import ModelController


@api_controller(
    "/perguntas",
    tags=["perguntas"],
    # permissions=[IsAuthenticated],
    # auth=JWTAuth(),
)
class PerguntaController(ModelController):
    model = Pergunta
    SchemaIn = PerguntaIn
    SchemaOut = PerguntaOut

    @route.get(
        "",
        response=NinjaPaginationResponseSchema[SchemaOut],
        url_name="pergunta-list",
    )
    @paginate()
    @throttle
    def get_perguntas(self):
        return self.get_queryset()

    @route.get("/{pk}/", response=SchemaOut, url_name="pergunta-detail")
    def get_pergunta(self, pk: int):
        return get_object_or_404(self.model, id=pk)

    @route.post(
        "",
        response=[(201, IdSchema), (400, OkSchema)],
        url_name="pergunta-create",
        permissions=[IsAuthenticated, IsAdminUser],
    )
    def create_pergunta(self, payload: SchemaIn):
        try:
            model = payload.create(**payload.model_dump())
            return 201, {"id": model.pk}  # noqa: TRY300
        except Exception as ex:  # noqa: BLE001
            return 400, {"details": str(ex)}

    @route.put(
        "/{int:pk}",
        response=[(200, SchemaOut), (400, ErrorSchema)],
        url_name="pergunta-update",
        permissions=[IsAuthenticated, IsAdminUser],
    )
    def update_pergunta(self, pk: int, payload: SchemaIn):
        try:
            obj = self.get_object_or_exception(
                payload.get_queryset(), id__exact=pk)
            payload.update(obj)
        except (Exception, NotFound) as ex:
            return 400, {"message": str(ex)}
        else:
            return obj

    @route.delete(
        "/{int:pk}",
        url_name="pergunta-delete",
        permissions=[IsAuthenticated, IsAdminUser],
        response={204: dict},
    )
    def delete_pergunta(self, pk: int):
        obj = self.get_object_or_exception(
            self.get_queryset(),
            id=pk,
            error_message=f"Object with id {pk} does not exist",
        )
        obj.delete()
        return self.create_response("Object Deleted", status_code=status.HTTP_204_NO_CONTENT)
