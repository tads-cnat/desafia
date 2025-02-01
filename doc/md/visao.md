## Desafia

## Histórico de Revisões

| Data       | Versão | Descrição                                                                | Autores                        |
| ---------- | ------ | ------------------------------------------------------------------------ | ------------------------------ |
| 09/05/2024 | 1.0    | Versão inicial                                                           | Maure Andrade e Marília Freire |
| 26/11/2024 | 1.1    | Revisão do escopo e definição das prioridades dos requisitos funcionais  | Maure Andrade                  |

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

## 3. Arqueologia e Comparação de Requisitos de Sistemas Semelhantes
Para embasar o levantamento de requisitos do Desafia, foram analisadas plataformas consolidadas no mercado, como Kahoot e Quizizz, identificando suas funcionalidades, pontos fortes e limitações. Esses sistemas contribuíram diretamente para a definição de prioridades e diferenciais do projeto:

### 3.1. Contribuições dos Sistemas Analisados
**Kahoot**:

- Pontos Fortes: Interface intuitiva, gamificação, execução síncrona de questionários e relatórios básicos de desempenho.
- Limitações: Modelo de negócio pago para funcionalidades avançadas, restrições de personalização e dependência de conexão estável.
- Influência no Desafia: Inspirou requisitos como "execução de questionário", "classificação e pontuação" e "monitoramento em tempo real".

**Quizizz**:

- Pontos Fortes: Modo assíncrono, biblioteca de questões compartilhadas e relatórios detalhados por aluno.
- Limitações: Custo elevado para acesso completo e integração limitada com ambientes educacionais institucionais.
- Influência no Desafia: Motivou requisitos como "configuração de privacidade de questões" e "exportação de questionários".

3.2. Diferenciais do Desafia

A análise dessas plataformas permitiu destacar os seguintes diferenciais para o **Desafia**:

- Open Source e Gratuito: Eliminação de barreiras financeiras para o IFRN e instituições públicas.
- Personalização: Adaptação às necessidades específicas do contexto educacional brasileiro.

## 4. Descrição das partes interessadas

### 4.1. Resumo das partes interessadas

| Nome                          | Descrição                                                                                                             | Responsabilidades                                                                                                               |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Organizadores                 | Pessoa responsável por criar e gerenciar os questionários e as partidas, geralmente um professor ou instrutor         | Criar questionários, gerenciar partidas, avaliar o desempenho dos participantes, fornecer feedback.                             |
| Alunos/Participantes          | Usuário que participa de uma partida, respondendo às questões do questionário, com o objetivo de aprender e competir. | Responder às questões, competir com outros participantes, aprender através da participação ativa.                               |
| Desenvolvedores da Plataforma | A equipe responsável pelo desenvolvimento e manutenção da plataforma.                                                 | Desenvolver novos recursos, corrigir bugs, garantir a segurança e estabilidade do sistema, otimizar o desempenho da plataforma. |

### 4.2. Ambiente do usuário

O uso da plataforma envolve várias pessoas, dependendo do contexto de uso. Em um cenário educacional típico, há um instrutor que cria os questionários e lideram as partidas, enquanto os alunos participam respondendo às questões.

Uma partida pode ter um ciclo relativamente curto, com duração de 5 a 30 minutos. Para os organizadores, o tempo investido na criação de um questionário pode depender da complexidade das questões. Para os participantes, o tempo gasto respondendo às questões durante uma partida pode ser relativamente curto, com apenas alguns segundos para cada pergunta.

O ambiente ideal para o acesso à plataforma é uma sala de aula, mas também pode ser acessada com os usuários separados, desde que haja conectividade com a internet. Além disso, a plataforma pode ser usada em conjunto com outras ferramentas de ensino ou colaboração existentes, como Google Classroom, Google Meet, Moodle, Slack ou Microsoft Teams, dependendo do contexto de uso.

## 5. Necessidades dos Usuários

### 5.1. Requisitos funcionais

> Os requisitos funcionais estão listados de acordo com a prioridade acertada pela equipe, começando pelo requisito mais desejado ao menos desejado.

| Nome                                        | Descrição                                                                                                                                       |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Execução de questionário                    | Permitir ao criador a execução de uma partida de forma síncrona.                                                                                |
| Participação em partidas                    | Permitir que os usuários participem de partidas organizados por Organizadores.                                                                  |
| Criação de questões                         | Permitir que usuários cadastrados possam criar questões (múltipla escolha, verdadeiro/falso) para usá-las em questionários.                     |
| Criação de questionários                    | Capacidade de criar questionários interativos com questões de múltipla escolha, verdadeiro/falso, etc.                                          |
| Edição de questionários                     | Permitir aos usuários editar questionários existentes, adicionando, removendo ou modificando questões.                                          |
| Classificação e pontuação                   | Rastrear e exibir a pontuação dos participantes durante as partidas, classificando-os com base no desempenho.                                   |
| Monitoramento                               | Permitir que os organizadores das partidas consigam gerenciar o andamento da partida.                                                           |
| Configuração de tempo                       | Possibilitar definir um tempo máximo de resposta para cada pergunta.                                                                            |
| Ranking dos participantes                   | Geração de rankings dos participantes com base no desempenho geral, levando em conta tanto a corretude das respostas quanto o tempo de resposta |
| Desempenho médio final dos participantes    | Geração de um relatório da média de desempenho geral dos participantes sobre a aplicação do questionário                                        |
| Relatórios e análises                       | Gerar relatórios sobre a aplicação do questionário naquela partida, com estatísticas de acertos e erros e etc.                                  |
| Histórico de execuções                      | Manter o histórico das execuções dos questionários                                                                                              |
| Estatísticas de acertos e erros por questão | Geração de relatórios que mostram a taxa de acerto e erro para cada pergunta do questionário ao final de uma partida                            |
| Configuração de privacidade                 | Cada questão pode ser configurada como pública (para ser usada por outros docentes) ou privadas.                                                |
| Exportação de questionário                  | Permitir ao criador de um questionário exportá-lo em pdf ou outro formato intermediário como .csv                                               |
| Registro de usuário                         | Permitir que os usuários registrem suas contas na plataforma para acessar os recursos completos.                                                |
| Perfil de usuário                           | Permitir que os usuários registrados possam editar suas informações pessoais.                                                                   |

### 5.2. Requisitos não-funcionais

| Nome            | Descrição                                                                                                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Compatibilidade | A plataforma deve ser compatível com uma variedade de navegadores da web e dispositivos móveis, garantindo uma experiência consistente para todos os usuários, independentemente do dispositivo que estão usando.      |
| Escalabilidade  | O sistema deve ser capaz de escalar facilmente para lidar com um aumento repentino no número de usuários ou jogos, garantindo que a experiência do usuário não seja comprometida durante picos de tráfego.             |
| Usabilidade     | A interface do usuário deve ser intuitiva e fácil de usar, garantindo que os usuários possam navegar e interagir com a plataforma sem dificuldades, independentemente do seu nível de habilidade tecnológica.          |
| Responsividade  | A interface móvel deve ser totalmente responsiva, adaptando-se de forma dinâmica e eficaz a uma ampla variedade de dispositivos móveis, incluindo smartphones e tablets, com diferentes tamanhos de tela e resoluções. |

## 6. Glossário

| Termo        | Descrição                                                                                                                                                                              |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Questão      | Pergunta criada para ser incluída em um questionário, que pode ser do tipo múltipla escolha ou verdadeiro/falso.                                                                       |
| Questionário | Conjunto de questões organizadas de forma estruturada para realizar uma atividade de aprendizagem interativa, geralmente com o objetivo de avaliar os conhecimentos dos participantes. |
| Partida      | Sessão interativa de execução de um questionário, na qual os participantes respondem às questões em tempo real, com pontuação e ranking gerados conforme o desempenho.                 |
