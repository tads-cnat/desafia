# Desafia

**Desafia** é um clone open-source do [Kahoot](https://kahoot.com/), desenvolvido para oferecer quizzes interativos e dinâmicos em tempo real. Ideal para atividades educacionais, gincanas e jogos em grupo, o Desafia utiliza tecnologias modernas para proporcionar uma experiência fluida tanto para os criadores de quizzes quanto para os participantes.

> **Atenção:** Este software está em fase inicial de desenvolvimento. Embora já ofereça funcionalidades essenciais, há muitos aspectos a serem aprimorados e novas funcionalidades a serem implementadas. Suas contribuições e sugestões são muito bem-vindas!

---

## 🚀 Tecnologias Utilizadas

O sistema foi desenvolvido com uma arquitetura dividida em três camadas principais:

### 🖥️ Frontend
- **React** com TypeScript
- **Axios** para consumo da API REST
- **WebSocket nativo** para comunicação em tempo real
- **Tailwind CSS** para estilos responsivos

### 🧠 Backend
- **Django** como framework principal
- **Django Ninja** para construção da API REST
- **Django Channels** para comunicação via WebSocket
- **Redis** como backend para gerenciamento dos canais

### 📦 Deploy
- **Docker** e **Docker Compose** para criação dos containers
- **Nginx** como servidor reverse proxy

---

## 📸 Funcionalidades

- 📋 Criação e gerenciamento de quizzes com múltiplas perguntas e alternativas  
- 🎮 Sistema de salas com código único para ingresso dos participantes  
- 🧑‍🏫 Painel do apresentador com controle da partida em tempo real  
- 📱 Interface para participação e resposta às perguntas  
- 🏆 Sistema de pontuação com ranking e feedback ao final do jogo  
- 💬 Comunicação em tempo real via WebSockets  
- 🔐 Autenticação e autorização de usuários  
- 🧪 Suporte a gincanas e fases encadeadas *(em desenvolvimento)*

---

## 📦 Como Rodar Localmente

### Pré-requisitos
- Docker e Docker Compose instalados no seu ambiente

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/desafia.git
   cd desafia
   ```

2. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias (consulte o arquivo `.env.example` para referência).

3. **Suba os containers:**
   ```bash
   docker-compose up --build
   ```

4. **Acesse o sistema:**
   - Frontend: `http://localhost`
   - API: `http://localhost/api`

---

## 🔧 Scripts Úteis

- Executar migrações:
  ```bash
  docker-compose exec backend python manage.py migrate
  ```
- Criar um superusuário:
  ```bash
  docker-compose exec backend python manage.py createsuperuser
  ```

---

## 📁 Estrutura do Projeto

```
desafia/
├── backend/
│   ├── desafia/        # Projeto Django principal
│   ├── api/            # API REST construída com Django Ninja
│   ├── ws/             # WebSocket implementado com Django Channels
│   └── ...             # Outros módulos e configurações
├── frontend/
│   └── v2/             # Aplicação React
├── nginx/
│   └── default.conf    # Configuração do Nginx
└── docker-compose.yml  # Orquestração dos containers Docker
```

---

## 🙌 Contribuição

Contribuições para a melhoria do Desafia são sempre bem-vindas! Se você tiver sugestões, encontrar bugs ou desejar contribuir com novas funcionalidades, por favor:

- Abra uma issue para discutir o assunto.
- Envie um pull request detalhando suas alterações.

Lembre-se de seguir as boas práticas de desenvolvimento e de incluir testes quando aplicável.

---

## 📄 Licença

Este software está licenciado sob a Licença Pública Geral GNU versão 3 (GLPv3). Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

