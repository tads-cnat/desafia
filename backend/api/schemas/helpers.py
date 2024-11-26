from typing import Any
from ninja import Schema


class OkSchema(Schema):
    message: str


class IdSchema(Schema):
    id: Any


class ErrorSchema(Schema):
    message: str
