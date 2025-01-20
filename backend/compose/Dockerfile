FROM docker.io/python:3.12.3-slim-bookworm as python

# Install apt packages
RUN apt-get update && apt-get install --no-install-recommends -y \
    # dependencies for building Python packages
    build-essential \
    # psycopg dependencies
    libpq-dev

# Requirements are installed here to ensure they will be cached.
COPY requirements.txt .

RUN pip install -r requirements.txt 

ARG APP_HOME=/app

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR ${APP_HOME}

RUN apt-get update && apt-get install --no-install-recommends -y \
    libpq-dev \
    gettext \
    curl \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/*

COPY . ${APP_HOME}

COPY ./compose/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start


ENTRYPOINT ["/start"]
