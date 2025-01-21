from django.core.management.base import BaseCommand
from api.models import Questionario, Questao, Alternativa
from django.contrib.auth import get_user_model
from api.models.categoria import Categoria


class Command(BaseCommand):
    help = 'Seed the database with a questionnaire about Computer Science fundamentals'

    def handle(self, *args, **kwargs):
        # Cria um usuário administrador, se ainda não existir
        User = get_user_model()
        user, created = User.objects.get_or_create(
            username='admin', defaults={'nome': 'Administrador'}
        )
        if created:
            user.set_password('admin')
            user.save()

        # Cria uma categoria para o questionário
        categoria, _ = Categoria.objects.get_or_create(
            nome="Ciência da Computação"
        )

        # Cria o questionário de fundamentos de Ciência da Computação
        questionario = Questionario.objects.create(
            nome='Fundamentos de Ciência da Computação',
            descricao='Este questionário aborda conceitos fundamentais de Ciência da Computação.',
            categoria=categoria,
            created_by=user
        )

        # Lista de questões sobre fundamentos de Ciência da Computação
        questoes = [
            {
                'enunciado': 'Qual é a principal função de um sistema operacional?',
                'alternativas': [
                    {'texto': 'Proteger o hardware de danos.', 'correta': False},
                    {'texto': 'Gerenciar os recursos do computador.', 'correta': True},
                    {'texto': 'Compilar programas para execução.', 'correta': False},
                    {'texto': 'Executar aplicativos em segundo plano.', 'correta': False}
                ]
            },
            {
                'enunciado': 'O que é um algoritmo?',
                'alternativas': [
                    {'texto': 'Um tipo de linguagem de programação.', 'correta': False},
                    {'texto': 'Um modelo matemático para armazenamento de dados.',
                        'correta': False},
                    {'texto': 'Uma sequência finita de passos para resolver um problema.',
                        'correta': True},
                    {'texto': 'Uma função utilizada para criptografia.', 'correta': False}
                ]
            },
            {
                'enunciado': 'Qual é a base do sistema binário?',
                'alternativas': [
                    {'texto': '8.', 'correta': False},
                    {'texto': '2.', 'correta': True},
                    {'texto': '10.', 'correta': False},
                    {'texto': '16.', 'correta': False}
                ]
            },
            {
                'enunciado': 'O que é a complexidade de tempo de um algoritmo?',
                'alternativas': [
                    {'texto': 'A quantidade de tempo que um algoritmo leva para ser executado.', 'correta': True},
                    {'texto': 'A quantidade de memória utilizada por um algoritmo.',
                        'correta': False},
                    {'texto': 'O número de operações aritméticas realizadas.',
                        'correta': False},
                    {'texto': 'O tamanho do código-fonte do algoritmo.', 'correta': False}
                ]
            },
            {
                'enunciado': 'Qual das opções abaixo é um exemplo de estrutura de dados?',
                'alternativas': [
                    {'texto': 'Fila.', 'correta': True},
                    {'texto': 'Compilador.', 'correta': False},
                    {'texto': 'Protocolo.', 'correta': False},
                    {'texto': 'Interrupção.', 'correta': False}
                ]
            }
        ]

        # Criação das questões e alternativas
        for q in questoes:
            questao = Questao.objects.create(
                enunciado=q['enunciado'],
                created_by=user
            )
            questionario.questoes.add(questao)

            for alt in q['alternativas']:
                Alternativa.objects.create(
                    questao_relacionada=questao,
                    texto=alt['texto'],
                    correta=alt['correta'],
                    created_by=user
                )

        self.stdout.write(self.style.SUCCESS(
            'Banco de dados populado com questões de fundamentos de Ciência da Computação com sucesso!'
        ))
