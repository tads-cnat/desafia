from django.core.management.base import BaseCommand
from api.models import Questionario, Questao, Alternativa
from django.contrib.auth import get_user_model
from django.apps import apps

from api.models.categoria import Categoria


class Command(BaseCommand):
    help = 'Seed the database with questionnaires about Scrum fundamentals and general knowledge'

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

        categoria_scrum = Categoria.objects.create(
            nome="Metodologias Ágeis",
        )

        categoria_geral = Categoria.objects.create(
            nome="Conhecimentos Gerais",
        )

        # Cria o questionário de fundamentos do Scrum
        questionario_scrum = Questionario.objects.create(
            nome='Fundamentos do Scrum',
            descricao='Este questionário aborda os conceitos básicos do framework Scrum.',
            categoria=categoria_scrum,
            created_by=user
        )

        # Lista de questões sobre fundamentos do Scrum
        questoes_scrum = [
            {
                'enunciado': 'Qual é o principal objetivo de uma Sprint no Scrum?',
                'alternativas': [
                    {'texto': 'Documentar todos os requisitos do produto.',
                        'correta': False},
                    {'texto': 'Entregar um incremento de software funcional.',
                        'correta': True},
                    {'texto': 'Garantir a aprovação do cliente final.', 'correta': False},
                    {'texto': 'Testar todo o sistema desenvolvido.', 'correta': False}
                ]
            },
            {
                'enunciado': 'Quem é responsável por priorizar o Product Backlog no Scrum?',
                'alternativas': [
                    {'texto': 'Scrum Master.', 'correta': False},
                    {'texto': 'Desenvolvedores.', 'correta': False},
                    {'texto': 'Product Owner.', 'correta': True},
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
                    {'texto': 'O Product Owner apresenta novos requisitos.',
                        'correta': False},
                    {'texto': 'São realizadas demonstrações do software para stakeholders.',
                        'correta': False},
                    {'texto': 'A equipe compartilha o progresso e planeja o trabalho diário.', 'correta': True},
                    {'texto': 'São revisados todos os testes do produto.',
                        'correta': False}
                ]
            },
            {
                'enunciado': 'Qual é a duração recomendada para uma Sprint?',
                'alternativas': [
                    {'texto': 'Depende da decisão do Scrum Master.', 'correta': False},
                    {'texto': 'Exatamente 2 semanas.', 'correta': False},
                    {'texto': 'De 4 a 6 semanas.', 'correta': False},
                    {'texto': 'De 1 a 4 semanas.', 'correta': True},
                ]
            },
            {
                'enunciado': 'O que é um Incremento no contexto do Scrum?',
                'alternativas': [
                    {'texto': 'Uma lista de pendências para a próxima Sprint.',
                        'correta': False},
                    {'texto': 'O resultado de todas as Sprints concluídas, entregando valor ao cliente.', 'correta': True},
                    {'texto': 'Um conjunto de testes automatizados.', 'correta': False},
                    {'texto': 'A documentação detalhada do produto.', 'correta': False}
                ]
            },
            {
                'enunciado': 'Qual evento no Scrum é dedicado a inspecionar e adaptar o trabalho da equipe?',
                'alternativas': [
                    {'texto': 'Sprint Planning.', 'correta': False},
                    {'texto': 'Sprint Review.', 'correta': False},
                    {'texto': 'Daily Scrum.', 'correta': False},
                    {'texto': 'Sprint Retrospective.', 'correta': True}
                ]
            },
            {
                'enunciado': 'Quem é responsável por garantir que a equipe Scrum funcione de maneira eficaz?',
                'alternativas': [
                    {'texto': 'Product Owner.', 'correta': False},
                    {'texto': 'Cliente.', 'correta': False},
                    {'texto': 'Scrum Master.', 'correta': True},
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

        # Adiciona as questões do Scrum
        for q in questoes_scrum:
            questao = Questao.objects.create(
                enunciado=q['enunciado'],
                created_by=user
            )
            questionario_scrum.questoes.add(questao)

            for alt in q['alternativas']:
                Alternativa.objects.create(
                    questao_relacionada=questao,
                    texto=alt['texto'],
                    correta=alt['correta'],
                    created_by=user
                )

        # Cria o questionário de conhecimentos gerais
        questionario_geral = Questionario.objects.create(
            nome='Conhecimentos Gerais',
            descricao='Este questionário aborda questões de conhecimentos gerais.',
            categoria=categoria_geral,
            created_by=user
        )

        # Lista de questões sobre conhecimentos gerais
        questoes_geral = [
            {
                'enunciado': 'Qual é o maior país do mundo em área territorial?',
                'alternativas': [
                    {'texto': 'Canadá.', 'correta': False},
                    {'texto': 'China.', 'correta': False},
                    {'texto': 'Estados Unidos.', 'correta': False},
                    {'texto': 'Rússia.', 'correta': True}
                ]
            },
            {
                'enunciado': 'Qual é o elemento químico representado pelo símbolo O?',
                'alternativas': [
                    {'texto': 'Ouro.', 'correta': False},
                    {'texto': 'Osmio.', 'correta': False},
                    {'texto': 'Oxigênio.', 'correta': True},
                    {'texto': 'Óxido.', 'correta': False}
                ]
            },
            {
                'enunciado': 'Quem pintou a Mona Lisa?',
                'alternativas': [
                    {'texto': 'Michelangelo.', 'correta': False},
                    {'texto': 'Vincent van Gogh.', 'correta': False},
                    {'texto': 'Leonardo da Vinci.', 'correta': True},
                    {'texto': 'Pablo Picasso.', 'correta': False}
                ]
            },
            {
                'enunciado': 'Qual é o rio mais longo do mundo?',
                'alternativas': [
                    {'texto': 'Rio Amazonas.', 'correta': True},
                    {'texto': 'Rio Nilo.', 'correta': False},
                    {'texto': 'Rio Yangtzé.', 'correta': False},
                    {'texto': 'Rio Mississippi.', 'correta': False}
                ]
            },
            {
                'enunciado': 'Qual é a capital da Austrália?',
                'alternativas': [
                    {'texto': 'Sydney.', 'correta': False},
                    {'texto': 'Melbourne.', 'correta': False},
                    {'texto': 'Brisbane.', 'correta': False},
                    {'texto': 'Canberra.', 'correta': True}
                ]
            },
            {
                'enunciado': 'Qual é o planeta mais próximo do Sol?',
                'alternativas': [
                    {'texto': 'Vênus.', 'correta': False},
                    {'texto': 'Marte.', 'correta': False},
                    {'texto': 'Mercúrio.', 'correta': True},
                    {'texto': 'Terra.', 'correta': False}
                ]
            },
            {
                'enunciado': 'Quem escreveu "Dom Quixote"?',
                'alternativas': [
                    {'texto': 'William Shakespeare.', 'correta': False},
                    {'texto': 'Jorge Luis Borges.', 'correta': False},
                    {'texto': 'Gabriel García Márquez.', 'correta': False},
                    {'texto': 'Miguel de Cervantes.', 'correta': True}
                ]
            },
            {
                'enunciado': 'Quantos lados tem um hexágono?',
                'alternativas': [
                    {'texto': '6.', 'correta': True},
                    {'texto': '5.', 'correta': False},
                    {'texto': '7.', 'correta': False},
                    {'texto': '8.', 'correta': False}
                ]
            },
            {
                'enunciado': 'Qual é o idioma mais falado no mundo?',
                'alternativas': [
                    {'texto': 'Inglês.', 'correta': False},
                    {'texto': 'Chinês Mandarim.', 'correta': True},
                    {'texto': 'Espanhol.', 'correta': False},
                    {'texto': 'Hindu.', 'correta': False}
                ]
            },
            {
                'enunciado': 'Qual é o valor de pi (π) arredondado para duas casas decimais?',
                'alternativas': [
                    {'texto': '3,15.', 'correta': False},
                    {'texto': '3,13.', 'correta': False},
                    {'texto': '3,14.', 'correta': True},
                    {'texto': '3,16.', 'correta': False}
                ]
            }
        ]

        # Adiciona as questões de conhecimentos gerais
        for q in questoes_geral:
            questao = Questao.objects.create(
                enunciado=q['enunciado'],
                created_by=user
            )
            questionario_geral.questoes.add(questao)

            for alt in q['alternativas']:
                Alternativa.objects.create(
                    questao_relacionada=questao,
                    texto=alt['texto'],
                    correta=alt['correta'],
                    created_by=user
                )

        self.stdout.write(self.style.SUCCESS(
            'Banco de dados populado com sucesso com os questionários de fundamentos do Scrum e conhecimentos gerais!'
        ))
