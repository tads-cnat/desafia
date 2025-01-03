from ninja_jwt.schema import TokenObtainPairInputSchema, TokenRefreshInputSchema
from ninja_jwt.controller import TokenObtainPairController
from ninja_extra import api_controller, route
from ninja import Schema

from api.schemas.user import UserSchema


class MyTokenObtainPairOutSchema(Schema):
    refresh: str
    access: str
    user: UserSchema


class MyTokenObtainPairSchema(TokenObtainPairInputSchema):
    def output_schema(self):
        out_dict = self.get_response_schema_init_kwargs()
        out_dict.update(user=UserSchema.from_orm(self._user))
        return MyTokenObtainPairOutSchema(**out_dict)


class MyTokenRefreshOutSchema(Schema):
    access: str


@api_controller('/login/', tags=['Auth'])
class MyTokenObtainPairController(TokenObtainPairController):
    @route.post(
        "/", response=MyTokenObtainPairOutSchema, url_name="token_obtain_pair"
    )
    def obtain_token(self, user_token: MyTokenObtainPairSchema):
        return user_token.output_schema()

    @route.post(
        "/refresh/", response=MyTokenRefreshOutSchema, url_name="token_refresh"
    )
    def refresh_token(self, refresh_token: TokenRefreshInputSchema):
        access_token = refresh_token.get_access_token()
        return MyTokenRefreshOutSchema(access=access_token)
