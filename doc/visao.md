## Desafia

## Histórico de Revisões

| Data       | Versão | Descrição      | Autores                        |
| ---------- | ------ | -------------- | ------------------------------ |
| 09/05/2024 | 1.0    | Versão inicial | Maure Andrade e Marília Freire |

## 1. Introdução

O sistema proposto surge da necessidade de oferecer ao IFRN uma ferramenta acessível e flexível para promover o engajamento dos alunos em sala de aula e aprimorar o processo de ensino e aprendizado.
Nosso projeto visa desenvolver uma alternativa ao Kahoot, uma plataforma popular, mas limitada em termos de custo. Nossa solução open source e gratuita permitirá que os professores do IFRN criem questionários e conduzam atividades interativas de aprendizado de forma fácil.

## 2. Descrição do Problema

### 2.1. Descrição da situação

|                       |                                                                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| O problema é          | _falta de uma plataforma de aprendizado interativo gratuita para uso em sala de aula_                                                                 |
| afeta                 | _os professores e alunos que carecem de uma ferramenta eficaz e gratuita para criar e conduzir atividades interativas de aprendizado em sala de aula_ |
| o impacto que causa é | _falta de engajamento e limitação no acesso a recursos educacionais interativos_                                                                      |
| uma solução seria     | _desenvolver uma versão alternativa das plataformas disponíveis atualmente no mercado._                                                               |

### 2.2. Descrição da função do produto

|                  |                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| Para             | _o IFRN e seus professores e alunos_                                                                             |
| os quais         | _carecem de uma plataforma de aprendizagem interativa_                                                           |
| nossa plataforma | _aprendizado interativo é uma solução acessível e personalizável_                                                |
| que              | _promove o engajamento dos alunos e facilita o processo de ensino_                                               |
| diferente do     | _Kahoot/Quizziz_                                                                                                 |
| nosso produto    | _oferece uma abordagem livre e gratuita, permitindo uma integração perfeita com o ambiente educacional do IFRN._ |

## 3. Descrição das partes interessadas

### 3.1. Resumo das partes interessadas

| Nome                          | Descrição                                                                                    | Responsabilidades                                                                                                               |
| ----------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Organizadores                 | Professores que utilizam a plataforma para criar questionários e conduzir jogos interativos. | Criar questionários, liderar jogos, avaliar o desempenho dos participantes, fornecer feedback.                                  |
| Alunos/Participantes          | Os indivíduos que participam dos jogos interativos criados pelos organizadores.              | Responder às perguntas, competir com outros participantes, aprender através da participação ativa.                              |
| Desenvolvedores da Plataforma | A equipe responsável pelo desenvolvimento e manutenção da plataforma.                        | Desenvolver novos recursos, corrigir bugs, garantir a segurança e estabilidade do sistema, otimizar o desempenho da plataforma. |

### 3.2. Ambiente do usuário

O uso da plataforma pode envolver várias pessoas, dependendo do contexto de uso. Em um cenário educacional típico, pode haver um ou vários instrutores que criam os questionários e lideram os jogos, enquanto os alunos participam respondendo às perguntas.

Um jogo ao vivo pode ter um ciclo relativamente curto, com duração de 10 a 30 minutos. Para os organizadores, o tempo investido na criação de um questionário pode depender da complexidade das perguntas e do nível de interatividade desejado. Para os participantes, o tempo gasto respondendo às perguntas durante um jogo ao vivo pode ser relativamente curto, com apenas alguns segundos para cada pergunta.

O ambiente ideal para o acesso à plataforma é uma sala de aula, mas também pode ser acessada com os usuários separados, desde que haja conectividade com a internet. Além disso, a plataforma pode ser usada em conjunto com outras ferramentas de ensino ou colaboração existentes, como Google Classroom, Google Meet, Moodle, Slack ou Microsoft Teams, dependendo do contexto de uso.

## 4. Necessidades dos Usuários

### 4.1. Requisitos funcionais

| Nome                                        | Descrição                                                                                                                                       | Prioridade |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Registro de usuário                         | Permitir que os usuários registrem suas contas na plataforma para acessar os recursos completos.                                                |            |
| Perfil de usuário                           | Permitir que os usuários registrados possam editar suas informações pessoais.                                                                   |            |
| Criação de perguntas                        | Permitir que usuários cadastrados possam criar perguntas (múltipla escolha, verdadeiro/falso) para usá-las em questionários.                    |            |
| Configuração de tempo                       | Possibilitar definir um tempo máximo de resposta para cada pergunta.                                                                            |            |
| Criação de questionários                    | Capacidade de criar questionários interativos com perguntas de múltipla escolha, verdadeiro/falso, etc.                                         |            |
| Configuração de privacidade                 | Cada questão pode ser configurada como pública (para ser usada por outros docentes) ou privadas.                                                |            |
| Edição de questionários                     | Permitir aos usuários editar questionários existentes, adicionando, removendo ou modificando perguntas.                                         |            |
| Execução de questionário                    | Permitir ao criador a execução de um jogo de forma síncrona ou assíncrona (com data/hora de início e fim configurável).                         |            |
| Participação em partidas                    | Permitir que os usuários participem de jogos ao vivo (partidas) organizados por outros usuários.                                                |            |
| Classificação e pontuação                   | Rastrear e exibir a pontuação dos participantes durante os jogos, classificando-os com base no desempenho.                                      |            |
| Monitoramento                               | Permitir que os organizadores das partidas consigam gerenciar o andamento do jogo.                                                              |            |
| Exportação de questionário                  | Permitir ao criador de um questionário exportá-lo em pdf ou outro formato intermediário como .csv                                               |            |
| Estatísticas de acertos e erros por questão | Geração de relatórios que mostram a taxa de acerto e erro para cada pergunta do questionário ao final de uma partida                            |            |
| Ranking dos participantes                   | Geração de rankings dos participantes com base no desempenho geral, levando em conta tanto a corretude das respostas quanto o tempo de resposta |            |
| Desempenho médio final dos participantes    | Geração de um relatório da média de desempenho geral dos participantes sobre a aplicação do questionário                                        |            |
| Histórico de execuções                      | Manter o histórico das execuções dos questionários                                                                                              |            |
| Categorização de questões                   | As questões, ao serem criadas, poderão ser categorizadas por assunto                                                                            |            |
| Relatórios e análises                       | Gerar relatórios sobre o jogo, com estatísticas de acertos e erros e etc.                                                                       |            |

### 4.2. Requisitos não-funcionais

| Nome            | Descrição                                                                                                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Compatibilidade | A plataforma deve ser compatível com uma variedade de navegadores da web e dispositivos móveis, garantindo uma experiência consistente para todos os usuários, independentemente do dispositivo que estão usando.      |
| Escalabilidade  | O sistema deve ser capaz de escalar facilmente para lidar com um aumento repentino no número de usuários ou jogos, garantindo que a experiência do usuário não seja comprometida durante picos de tráfego.             |
| Usabilidade     | A interface do usuário deve ser intuitiva e fácil de usar, garantindo que os usuários possam navegar e interagir com a plataforma sem dificuldades, independentemente do seu nível de habilidade tecnológica.          |
| Responsividade  | A interface móvel deve ser totalmente responsiva, adaptando-se de forma dinâmica e eficaz a uma ampla variedade de dispositivos móveis, incluindo smartphones e tablets, com diferentes tamanhos de tela e resoluções. |
