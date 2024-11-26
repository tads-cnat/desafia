
from ninja import Schema


class UserSchema(Schema):
    nome: str | None
    bio: str | None
