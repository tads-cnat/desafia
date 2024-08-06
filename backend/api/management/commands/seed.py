from django.core.management.base import BaseCommand
from api.models import Questionario, Questao, Alternativa, Usuario
from django.contrib.auth import get_user_model
from django.apps import apps


class Command(BaseCommand):
    help = 'Seed the database with a questionnaire and 10 real questions'

    def handle(self, *args, **kwargs):
        app = apps.get_app_config('api')
        for model in app.get_models():
            model.objects.all().delete()
        User = get_user_model()
        user, created = User.objects.get_or_create(
            username='admin', defaults={'nome': 'Administrador'}
        )
        if created:
            user.set_password('admin')
            user.save()

        questionario = Questionario.objects.create(
            nome='Questionário de Conhecimentos Gerais',
            descricao='Este é um questionário de conhecimentos gerais.',
            categoria='Conhecimentos Gerais',
            created_by=user
        )

        questoes = [
            {
                'enunciado': 'Qual é a capital da França?',
                'alternativas': [
                    {'texto': 'Paris', 'correta': True},
                    {'texto': 'Londres', 'correta': False},
                    {'texto': 'Berlim', 'correta': False},
                    {'texto': 'Madri', 'correta': False}
                ]
            },
            {
                'enunciado': 'Quem pintou a Mona Lisa?',
                'alternativas': [
                    {'texto': 'Leonardo da Vinci', 'correta': True},
                    {'texto': 'Pablo Picasso', 'correta': False},
                    {'texto': 'Vincent van Gogh', 'correta': False},
                    {'texto': 'Claude Monet', 'correta': False}
                ]
            },
            {
                'enunciado': 'Qual é o maior planeta do nosso sistema solar?',
                'alternativas': [
                    {'texto': 'Júpiter', 'correta': True},
                    {'texto': 'Saturno', 'correta': False},
                    {'texto': 'Terra', 'correta': False},
                    {'texto': 'Marte', 'correta': False}
                ]
            },
            {
                'enunciado': 'Em que ano a Segunda Guerra Mundial terminou?',
                'alternativas': [
                    {'texto': '1945', 'correta': True},
                    {'texto': '1939', 'correta': False},
                    {'texto': '1941', 'correta': False},
                    {'texto': '1950', 'correta': False}
                ]
            },
            {
                'enunciado': 'Quem escreveu "Dom Quixote"?',
                'alternativas': [
                    {'texto': 'Miguel de Cervantes', 'correta': True},
                    {'texto': 'William Shakespeare', 'correta': False},
                    {'texto': 'Dante Alighieri', 'correta': False},
                    {'texto': 'Gabriel Garcia Marquez', 'correta': False}
                ]
            },
            {
                'enunciado': 'Qual é o elemento químico representado pelo símbolo "O"?',
                'alternativas': [
                    {'texto': 'Oxigênio', 'correta': True},
                    {'texto': 'Ouro', 'correta': False},
                    {'texto': 'Osmio', 'correta': False},
                    {'texto': 'Oganesson', 'correta': False}
                ]
            },
            {
                'enunciado': 'Quem foi o primeiro homem a pisar na lua?',
                'alternativas': [
                    {'texto': 'Neil Armstrong', 'correta': True},
                    {'texto': 'Buzz Aldrin', 'correta': False},
                    {'texto': 'Yuri Gagarin', 'correta': False},
                    {'texto': 'Michael Collins', 'correta': False}
                ]
            },
            {
                'enunciado': 'Qual é a língua oficial do Brasil?',
                'alternativas': [
                    {'texto': 'Português', 'correta': True},
                    {'texto': 'Espanhol', 'correta': False},
                    {'texto': 'Inglês', 'correta': False},
                    {'texto': 'Francês', 'correta': False}
                ]
            },
            {
                'enunciado': 'Qual é o oceano que banha a costa leste do Brasil?',
                'alternativas': [
                    {'texto': 'Atlântico', 'correta': True},
                    {'texto': 'Pacífico', 'correta': False},
                    {'texto': 'Índico', 'correta': False},
                    {'texto': 'Ártico', 'correta': False}
                ]
            },
            {
                'enunciado': 'Quem é conhecido como o pai da computação?',
                'alternativas': [
                    {'texto': 'Alan Turing', 'correta': True},
                    {'texto': 'Albert Einstein', 'correta': False},
                    {'texto': 'Isaac Newton', 'correta': False},
                    {'texto': 'Nikola Tesla', 'correta': False}
                ]
            }
        ]

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
            'Banco de dados populado com sucesso!'))
