
from ninja import Schema


class UserIn(Schema):
    nome: str | None
    username: str
    password: str


class UserOut(Schema):
    id: int
    nome: str
    bio: str | None
    username: str
