from typing import Any
import uuid
from ninja import Schema


class OkSchema(Schema):
    message: str


class IdSchema(Schema):
    id: Any


class UuidSchema(Schema):
    id: uuid.UUID


class ErrorSchema(Schema):
    message: str


class NameSchema(Schema):
    name: str
