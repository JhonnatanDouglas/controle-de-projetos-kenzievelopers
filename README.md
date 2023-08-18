
# Controle de Projetos - KenzieVelopers

![GitHub repo size](https://img.shields.io/github/repo-size/JhonnatanDouglas/controle-de-projetos-kenzievelopers)
![GitHub last commit](https://img.shields.io/github/last-commit/JhonnatanDouglas/controle-de-projetos-kenzievelopers)

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Iniciando](#iniciando)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
- [Rotas](#rotas)
  - [Desenvolvedores](#desenvolvedores)
    - [POST `/developers`](#post-developers)
    - [GET `/developers/:id`](#get-developersid)
    - [PATCH `/developers/:id`](#patch-developersid)
    - [DELETE `/developers/:id`](#delete-developersid)
    - [POST `/developers/:id/infos`](#post-developersidinfos)
  - [Projetos](#projetos)
    - [POST `/projects`](#post-projects)
    - [GET `/projects/:id`](#get-projectsid)
    - [PATCH `/projects/:id`](#patch-projectsid)
- [Contribuição](#contribuição)

## Sobre o Projeto

Uma startup de tecnologia e desenvolvimento web decidiu criar uma API Rest para gerenciar seus desenvolvedores e projetos. Esta aplicação permite o registro de desenvolvedores, associação de informações extras a eles e registro de projetos de cada desenvolvedor.

## Tecnologias Utilizadas

![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-latest-green.svg)
![Express](https://img.shields.io/badge/Express-4.x-blue.svg)
![pg](https://img.shields.io/badge/pg-8.x-blue.svg)
![pg-format](https://img.shields.io/badge/pg--format-latest-lightgrey.svg)
![dotenv](https://img.shields.io/badge/dotenv-latest-yellow.svg)

## Iniciando

Siga as instruções abaixo para iniciar o projeto em sua máquina local.

### Pré-requisitos

- Node.js e npm instalados
- Banco de dados PostgreSQL configurado

### Instalação

1. Clone o repositório
   ```sh
   git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   ```
2. Instale as dependências
   ```sh
   npm install
   ```
3. Configure as variáveis de ambiente (crie um arquivo `.env` na raiz do projeto)
   ```env
   DB_HOST=seu_host
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_DATABASE=seu_banco
   ```
4. Execute a aplicação
   ```sh
   npm run dev
   ```

## Rotas

### Desenvolvedores

#### POST `/developers`

Cadastra um novo desenvolvedor.

- **Body de Requisição:**

  ```json
  {
    "name": "Nome do Desenvolvedor",
    "email": "email@example.com"
  }
  ```

- **Resposta de Sucesso (201 Created):**

  ```json
  {
    "id": 1,
    "name": "Nome do Desenvolvedor",
    "email": "email@example.com"
  }
  ```

#### GET `/developers/:id`

Retorna informações detalhadas de um desenvolvedor, incluindo informações adicionais associadas.

- **Resposta de Sucesso (200 OK):**

  ```json
  {
    "developerId": 1,
    "developerName": "Nome do Desenvolvedor",
    "developerEmail": "email@example.com",
    "developerInfoDeveloperSince": "2020-01-01",
    "developerInfoPreferredOS": "Windows"
  }
  ```

#### PATCH `/developers/:id`

Atualiza os dados de um desenvolvedor.

- **Body de Requisição:**

  ```json
  {
    "name": "Novo Nome"
  }
  ```

- **Resposta de Sucesso (200 OK):**

  ```json
  {
    "id": 1,
    "email": "email@example.com",
    "name": "Novo Nome"
  }
  ```

#### DELETE `/developers/:id`

Remove um desenvolvedor.

- **Resposta de Sucesso (204 No Content).**

#### POST `/developers/:id/infos`

Cadastra informações adicionais para um desenvolvedor.

- **Body de Requisição:**

  ```json
  {
    "developerSince": "2020-01-01",
    "preferredOS": "Windows"
  }
  ```

- **Resposta de Sucesso (201 Created):**

  ```json
  {
    "id": 1,
    "developerSince": "2020-01-01",
    "preferredOS": "Windows",
    "developerId": 1
  }
  ```

### Projetos

#### POST `/projects`

Cadastra um novo projeto.

- **Body de Requisição:**

  ```json
  {
    "name": "Nome do Projeto",
    "description": "Descrição do Projeto",
    "repository": "https://github.com/seu_usuario/seu_repositorio",
    "startDate": "2023-08-17"
  }
  ```

- **Resposta de Sucesso (201 Created):**

  ```json
  {
    "id": 1,
    "name": "Nome do Projeto",
    "description": "Descrição do Projeto",
    "repository": "https://github.com/seu_usuario/seu_repositorio",
    "startDate": "2023-08-17T00:00:00.000Z",
    "endDate": null,
    "developerId": null
  }
  ```

#### GET `/projects/:id`

Retorna informações detalhadas de um projeto, incluindo dados do desenvolvedor associado.

- **Resposta de Sucesso (200 OK):**

  ```json
  {
    "projectId": 1,
    "projectName": "Nome do Projeto",
    "projectDescription": "Descrição do Projeto",
    "projectRepository": "https://github.com/seu_usuario/seu_repositorio",
    "projectStartDate": "2023-08-17T00:00:00.000Z",
    "projectEndDate": null,
    "projectDeveloperName": null
  }
  ```

#### PATCH `/projects/:id`

Atualiza os dados de um projeto.

- **Body

 de Requisição:**

  ```json
  {
    "description": "Nova Descrição"
  }
  ```

- **Resposta de Sucesso (200 OK):**

  ```json
  {
    "id": 1,
    "name": "Nome do Projeto",
    "description": "Nova Descrição",
    "repository": "https://github.com/seu_usuario/seu_repositorio",
    "startDate": "2023-08-17T00:00:00.000Z",
    "endDate": null,
    "developerId": null
  }
  ```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
