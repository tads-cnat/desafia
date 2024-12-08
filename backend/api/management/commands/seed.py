from django.core.management.base import BaseCommand
from api.models import Questionario, Questao, Alternativa
from django.contrib.auth import get_user_model
from django.apps import apps

from api.models.categoria import Categoria


class Command(BaseCommand):
    help = 'Seed the database with a questionnaire about Scrum fundamentals and 10 questions'

    def handle(self, *args, **kwargs):
        # Limpa os dados existentes na aplicação
        app = apps.get_app_config('api')
        for model in app.get_models():
            model.objects.all().delete()

        # Cria um usuário administrador
        User = get_user_model()
        user, created = User.objects.get_or_create(
            username='admin', defaults={'nome': 'Administrador'}
        )
        if created:
            user.set_password('admin')
            user.save()

        categoria = Categoria.objects.create(
            nome="Metodologias Ágeis",
        )

        # Cria o questionário de fundamentos do Scrum
        questionario = Questionario.objects.create(
            nome='Fundamentos do Scrum',
            descricao='Este questionário aborda os conceitos básicos do framework Scrum.',
            categoria=categoria,
            created_by=user
        )

        # Lista de questões sobre fundamentos do Scrum
        questoes = [
            {
                'enunciado': 'Qual é o principal objetivo de uma Sprint no Scrum?',
                'alternativas': [
                    {'texto': 'Entregar um incremento de software funcional.',
                        'correta': True},
                    {'texto': 'Documentar todos os requisitos do produto.',
                        'correta': False},
                    {'texto': 'Garantir a aprovação do cliente final.', 'correta': False},
                    {'texto': 'Testar todo o sistema desenvolvido.', 'correta': False}
                ]
            },
            {
                'enunciado': 'Quem é responsável por priorizar o Product Backlog no Scrum?',
                'alternativas': [
                    {'texto': 'Product Owner.', 'correta': True},
                    {'texto': 'Scrum Master.', 'correta': False},
                    {'texto': 'Desenvolvedores.', 'correta': False},
                    {'texto': 'Cliente.', 'correta': False}
                ]
            },
            {
                'enunciado': 'Qual é a principal responsabilidade do Scrum Master?',
                'alternativas': [
                    {'texto': 'Garantir que a equipe siga os princípios e práticas do Scrum.', 'correta': True},
                    {'texto': 'Desenvolver o software e corrigir bugs.',
                        'correta': False},
                    {'texto': 'Gerenciar o cronograma e alocar recursos.',
                        'correta': False},
                    {'texto': 'Definir os objetivos de negócio do projeto.',
                        'correta': False}
                ]
            },
            {
                'enunciado': 'O que acontece na Daily Scrum?',
                'alternativas': [
                    {'texto': 'A equipe compartilha o progresso e planeja o trabalho diário.', 'correta': True},
                    {'texto': 'O Product Owner apresenta novos requisitos.',
                        'correta': False},
                    {'texto': 'São realizadas demonstrações do software para stakeholders.',
                        'correta': False},
                    {'texto': 'São revisados todos os testes do produto.',
                        'correta': False}
                ]
            },
            {
                'enunciado': 'Qual é a duração recomendada para uma Sprint?',
                'alternativas': [
                    {'texto': 'De 1 a 4 semanas.', 'correta': True},
                    {'texto': 'Exatamente 2 semanas.', 'correta': False},
                    {'texto': 'De 4 a 6 semanas.', 'correta': False},
                    {'texto': 'Depende da decisão do Scrum Master.', 'correta': False}
                ]
            },
            {
                'enunciado': 'O que é um Incremento no contexto do Scrum?',
                'alternativas': [
                    {'texto': 'O resultado de todas as Sprints concluídas, entregando valor ao cliente.', 'correta': True},
                    {'texto': 'Uma lista de pendências para a próxima Sprint.',
                        'correta': False},
                    {'texto': 'Um conjunto de testes automatizados.', 'correta': False},
                    {'texto': 'A documentação detalhada do produto.', 'correta': False}
                ]
            },
            {
                'enunciado': 'Qual evento no Scrum é dedicado a inspecionar e adaptar o trabalho da equipe?',
                'alternativas': [
                    {'texto': 'Sprint Retrospective.', 'correta': True},
                    {'texto': 'Sprint Planning.', 'correta': False},
                    {'texto': 'Sprint Review.', 'correta': False},
                    {'texto': 'Daily Scrum.', 'correta': False}
                ]
            },
            {
                'enunciado': 'Quem é responsável por garantir que a equipe Scrum funcione de maneira eficaz?',
                'alternativas': [
                    {'texto': 'Scrum Master.', 'correta': True},
                    {'texto': 'Product Owner.', 'correta': False},
                    {'texto': 'Cliente.', 'correta': False},
                    {'texto': 'Equipe de Desenvolvimento.', 'correta': False}
                ]
            },
            {
                'enunciado': 'O que ocorre durante a Sprint Planning?',
                'alternativas': [
                    {'texto': 'A equipe define o que será feito na Sprint e como será feito.', 'correta': True},
                    {'texto': 'São realizadas melhorias no Product Backlog.',
                        'correta': False},
                    {'texto': 'Os stakeholders aprovam o incremento.', 'correta': False},
                    {'texto': 'A equipe revisa as lições aprendidas na Sprint anterior.',
                        'correta': False}
                ]
            },
            {
                'enunciado': 'O que o time Scrum entrega ao final de uma Sprint?',
                'alternativas': [
                    {'texto': 'Um incremento de produto potencialmente utilizável.',
                        'correta': True},
                    {'texto': 'Uma lista de melhorias sugeridas.', 'correta': False},
                    {'texto': 'Um relatório detalhado das atividades concluídas.',
                        'correta': False},
                    {'texto': 'Os requisitos completos para o próximo ciclo.',
                        'correta': False}
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
            'Banco de dados populado com questões de fundamentos do Scrum com sucesso!'))
