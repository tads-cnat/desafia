from ninja_jwt.schema import TokenObtainPairInputSchema, TokenRefreshInputSchema
from ninja_jwt.controller import TokenObtainPairController
from ninja_extra import api_controller, route, ControllerBase
from ninja import Schema

from api.schemas.user import UserIn, UserOut
from api.schemas import ErrorSchema
from api.models import Usuario


class MyTokenObtainPairOutSchema(Schema):
    refresh: str
    access: str
    user: UserIn


class MyTokenObtainPairSchema(TokenObtainPairInputSchema):
    def output_schema(self):
        out_dict = self.get_response_schema_init_kwargs()
        out_dict.update(user=UserIn.from_orm(self._user))
        return MyTokenObtainPairOutSchema(**out_dict)


class MyTokenRefreshOutSchema(Schema):
    access: str


@api_controller('/auth/', tags=['Auth'])
class MyTokenObtainPairController(TokenObtainPairController):
    @route.post(
        "/login/", response=MyTokenObtainPairOutSchema, url_name="token_obtain_pair"
    )
    def obtain_token(self, user_token: MyTokenObtainPairSchema):
        return user_token.output_schema()

    @route.post(
        "/refresh/", response=MyTokenRefreshOutSchema, url_name="token_refresh"
    )
    def refresh_token(self, refresh_token: TokenRefreshInputSchema):
        access_token = refresh_token.get_access_token()
        return MyTokenRefreshOutSchema(access=access_token)


@api_controller('/auth/', tags=['Auth'])
class RegisterUsuarioController(ControllerBase):
    SchemaIn = UserIn
    SchemaOut = UserOut

    @route.post(
        "/register/", response={201: SchemaOut, 400: ErrorSchema}, url_name="register_user"
    )
    def register_user(self, payload: UserIn):
        if Usuario.objects.filter(username=payload.username).exists():
            return 400, {"error": "Um usuário com esse username já existe."}

        user = Usuario.objects.create_user(
            username=payload.username,
            password=payload.password,
            nome=payload.nome,
        )
        return 201, {
            "id": user.id,
            "username": user.username,
            "nome": user.nome,
            "bio": user.bio,
        }
        pass
