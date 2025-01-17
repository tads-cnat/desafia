import random
from api.models.partida import Partida


class CodigoAcessoService:
    @staticmethod
    def gerar_codigo_unico():
        while True:
            codigo = f"{random.randint(100000, 999999)}"
            if not Partida.objects.filter(codigo_acesso=codigo, ativa=True).exists():
                return codigo
