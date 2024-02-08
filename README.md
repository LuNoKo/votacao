# Votacao

## Descrição

Projeto realizado para um processo seletivo, para verificar o escopo do projeto solicitado [clique aqui](./README-project-scope.md)

---

## Configuração do projeto para primeira execução

- Na raiz do projeto instale as depentencias:

  ```bash
  npm install --prefix .\client\
  ```

- Acesse o a pasta `/server` e crie um arquivo `/server/.env`, existe um exemplo dentro da pasta.

- Execute um banco postgress e caso necessário altere o arquivo `/server/.env` com as credenciais.

### Para execução em produção é necessário configurar o `/server/.env.prod`

- Acesse o a pasta `/server` e crie um arquivo `/server/.env.prod`, existe um exemplo dentro da pasta.

---

## Executando o projeto em modo desenvolvimento

- Acesse a pasta `/server` e execute as migrations:

  ```bash
  npm run migration:run
  ```

- Na pasta raiz do projeto execute o seguinte comando:

  ```bash
  npm run dev
  ```

O npm irá executar os comandos para subir o frontend e o backend simultaneamente.

---

## Executando o projeto em modo produção

- Na pasta raiz do projeto execute o seguinte comando:

  ```bash
  docker compose -f "docker-compose.production.yml" up -d --build
  ```

- Após o container **votacao-server** exectutar acesse e execute o seguinte comando:

  ```bash
  npm run migration:run
  ```

---

## Documentação do server

- A documentação do server foi feita com swagger e se é possivel acessar executando o projeto em modo de desenvolvimento e acessando `localhost:3000/swagger`

---

## Primeira utilização

- Acesse a tela de registro e inscreva-se.
- O primeiro usuário sempre será inscrito como administrador, os subsequentes serão ususários comuns.
