# **Controle de projetos - KenzieVelopers**

### **Introdução**

Uma startup de tecnologia e desenvolvimento web decidiu criar uma API Rest para gerenciar seus desenvolvedores e projetos. Como você é um dos novos integrantes da equipe, você foi o escolhido para desenvolver essa aplicação.

Através dessa API deve ser possível realizar o registro do desenvolvedor, associar informações extras ao mesmo e registrar os projetos de cada desenvolvedor.

# Regras da aplicação

## **Rotas - /developers**

### Endpoints

| Método | Endpoint              | Responsabilidade                                    |
| ------ | --------------------- | --------------------------------------------------- |
| POST   | /developers           | Cadastrar um novo desenvolvedor                     |
| GET    | /developers/:id       | Listar um desenvolvedor e suas informações          |
| PATCH  | /developers/:id       | Atualizar os dados de um desenvolvedor              |
| DELETE | /developers/:id       | Remover um desenvolvedor                            |
| POST   | /developers/:id/infos | Cadastrar informações adicionais a um desenvolvedor |

#

### **POST /developers**

- **Sucesso**:
  - Retorno esperado: um objeto contendo os dados do developer cadastrado
  - Status esperado: _201 CREATED_
- **Falha**:

  - Caso o email já cadastrado no banco
    - Retorno esperado: um objeto contendo a chave **_message_** com uma mensagem adequada;
    - Status esperado: _409 CONFLICT_.

- **Exemplos de retornos**:
  | Dados de entrada: |
  | ----------------- |
  | Body: Formato Json |

  ```json
  {
    "email": "ugo@kenzie.com.br",
    "name": "Ugo"
  }
  ```

  - Criando um developer com sucesso:

    | Resposta do servidor:      |
    | -------------------------- |
    | Body: Formato Json         |
    | Status code: _201 CREATED_ |

    ```json
    {
      "id": 1,
      "name": "Ugo",
      "email": "ugo@kenzie.com.br"
    }
    ```

  - Tentando cadastrar com um email existente:

    | Resposta do servidor:       |
    | --------------------------- |
    | Body: Formato Json          |
    | Status code: _409 CONFLICT_ |

    ```json
    {
      "message": "Email already exists."
    }
    ```

#

### **GET /developers/:id**

- **Sucesso**:
  - Retorno esperado: um objeto contendo os dados mesclados das tabelas **_developers_** e **_developerInfos_**;
  - Status esperado: _200 OK_;
- **Falha**:

  - Caso o id informado não pertença à nenhum developer cadastrado
    - Retorno esperado: um objeto contendo a chave **_message_** com uma mensagem adequada;
    - Status esperado: _404 NOT FOUND_.

- **Exemplos de retornos**:

  - Listando um developer com sucesso:

    | Resposta do servidor: |
    | --------------------- |
    | Body: Formato Json    |
    | Status code: _200 OK_ |
    |                       |

    ```json
    {
      "developerId": 1,
      "developerName": "Ugo",
      "developerEmail": "ugo@kenzie.com.br",
      "developerInfoDeveloperSince": null,
      "developerInfoPreferredOS": null
    }
    ```

  - Tentando listar com um id inexistente:

    | Resposta do servidor:        |
    | ---------------------------- |
    | Body: Formato Json           |
    | Status code: _404 NOT FOUND_ |

    ```json
    {
      "message": "Developer not found."
    }
    ```

#

### **PATCH /developers/:id**

- **Sucesso**:

  - Retorno esperado: um objeto com os dados atualizados de developer;
  - Status esperado: _200 OK_.

- **Falha**:

  - Caso o id informado não pertence à nenhum developer cadastrado

    - Retorno esperado: um objeto contendo a chave **_message_** com uma mensagem adequada;
    - Status esperado: _404 NOT FOUND_.

  - Caso o email já esteja cadastrado no banco

    - Retorno esperado: um objeto contendo a chave **_message_** com uma mensagem adequada;
    - Status esperado: _409 CONFLICT_.

- **Exemplos de retornos**:
  | Dados de entrada: |
  | ----------------- |
  | Body: Formato Json |

  ```json
  {
    "email": "ugo.roveda@kenzie.com.br",
    "name": "Ugo Roveda"
  }
  ```

  - Atualizando um developer com sucesso:

    | Resposta do servidor: |
    | --------------------- |
    | Body: Formato Json    |
    | Status code: _200 OK_ |
    |                       |

    ```json
    {
      "id": 1,
      "email": "ugo.roveda@kenzie.com.br",
      "name": "Ugo Roveda"
    }
    ```

  - Tentando atualizar para um email existente:

    | Resposta do servidor:       |
    | --------------------------- |
    | Body: Formato Json          |
    | Status code: _409 CONFLICT_ |

    ```json
    {
      "message": "Email already exists."
    }
    ```

  - Tentando listar com um id inexistente:

    | Resposta do servidor:        |
    | ---------------------------- |
    | Body: Formato Json           |
    | Status code: _404 NOT FOUND_ |

    ```json
    {
      "message": "Developer not found."
    }
    ```

#

### **DELETE /developers/:id**

- **Sucesso**:
  - Retorno esperado: nenhum. Não deve retornar nenhum body;
  - Status esperado: _204 NO CONTENT_
- **Falha**:

  - Caso o id informado não pertença a nenhum developer cadastrado
    - Retorno esperado: um objeto contendo a chave **_message_** com uma mensagem adequada;
    - Status esperado: _404 NOT FOUND_.

- **Exemplos de retornos**:

  - Deletando um developer com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: nenhum body |
    | Status code: _204 NO CONTENT_ |

    ```json

    ```

  - Tentando deletar com um id inexistente:

    | Resposta do servidor:        |
    | ---------------------------- |
    | Body: Formato Json           |
    | Status code: _404 NOT FOUND_ |

    ```json
    {
      "message": "Developer not found."
    }
    ```

#

### **POST /developers/:id/infos**

- **Sucesso**:
  - Retorno esperado: objeto contendo as seguintes chaves:
    - **id**: tipo **_number_**
    - **developerSince**: tipo **_Date_**, formato americano YYYY-MM-DD.
    - **preferredOS**: tipo **_string_**
    - **developerId**: tipo **_number_**
  - Status esperado: _201 CREATED_
- **Falha**:
  - Caso o developer com id informado já contém uma informação adicional:
    - Retorno esperado: um objeto contendo a chave **_message_** com uma mensagem adequada;
    - Status esperado: _409 CONFLICT_.
  - Caso: preferredOS informado não é um dos três permitidos:
    - Body esperado: um objeto contendo a chave message com uma mensagem adequada e uma chave options sendo um array contendo as três opções possíveis;
    - Status esperado: 400 BAD REQUEST.
  - Caso o id informado não pertença a nenhum developer cadastrado
    - Retorno esperado: um objeto contendo a chave **_message_** com uma mensagem adequada;
    - Status esperado: _404 NOT FOUND_.
- **Exemplos de retornos**:
  | Dados de entrada: |
  | ----------------- |
  | Body: Formato Json |

  ```json
  {
    "developerSince": "2013-01-01",
    "preferredOS": "MacOS"
  }
  ```

  - Criando uma informação adicional com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _201 CREATED_ |

    ```json
    {
      "id": 1,
      "developerSince": "2013-01-01T02:00:00.000Z",
      "preferredOS": "MacOS",
      "developerId": 1
    }
    ```

  - Tentando cadastrar informação à um developer que já possui:

    | Resposta do servidor:       |
    | --------------------------- |
    | Body: Formato Json          |
    | Status code: _409 CONFLICT_ |

    ```json
    {
      "message": "Developer infos already exists."
    }
    ```

  - Tentando cadastrar informação com um preferredOS inválido:

    | Resposta do servidor:          |
    | ------------------------------ |
    | Body: Formato Json             |
    | Status code: _400 BAD REQUEST_ |

    ```json
    {
      "message": "Invalid OS option."
    }
    ```

  - Tentando cadastrar informação com um developer id inválido:

    | Resposta do servidor:        |
    | ---------------------------- |
    | Body: Formato Json           |
    | Status code: _404 NOT FOUND_ |

    ```json
    {
      "message": "Developer not found."
    }
    ```

#

## **Rota - /projects**

### Endpoints

| Método | Endpoint      | Responsabilidade                                      |
| ------ | ------------- | ----------------------------------------------------- |
| POST   | /projects     | Cadastrar um novo projeto                             |
| GET    | /projects/:id | Listar um projeto pelo id e os dados do desenvolvedor |
| PATCH  | /projects/:id | Atualizar um projeto                                  |

## Regras da aplicação

### **POST - /projects**

- **Sucesso**:

  - Retorno esperado: objeto contendo todos o dados do projeto criado;
  - Status esperado: _201 CREATED_

- **Falha**:
  - Caso o developerId não pertença a nenhum developer cadastrado
    - Retorno esperado: um objeto contendo a chave **_message_** com uma mensagem adequada;
    - Status esperado: _404 NOT FOUND_.
- **Exemplos de retornos**:
  | Dados de entrada: |
  | ----------------- |
  | Body: Formato Json |

  ```json
  // sem endDate e sem developerId
  {
    "name": "Projeto 1",
    "description": "Projeto fullstack",
    "repository": "url.com.br",
    "startDate": "2023-12-02",
  }

  // com endDate e com developerId
  {
    "name": "Projeto 2",
    "description": "Projeto backend",
    "repository": "url.com.br",
    "startDate": "2023-12-10",
    "endDate": "2023-12-23",
    "developerId": 1
  }
  ```

  - Criando um projeto com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _201 CREATED_ |

    ```json
    // sem endDate e sem developerId no body de envio
    {
      "id": 1,
      "name": "Projeto 1",
      "description": "Projeto fullstack",
      "repository": "url.com.br",
      "startDate": "2023-12-02T03:00:00.000Z",
      "endDate": null,
      "developerId": null
    }

    // com endDate no body de envio
    {
      "id": 2,
      "name": "Projeto 2",
      "description": "Projeto backend",
      "repository": "url.com.br",
      "startDate": "2023-12-10T03:00:00.000Z",
      "endDate": "2023-12-23T03:00:00.000Z",
      "developerId": 1
    }
    ```

  - Tentando criar com um developerId inválido:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _404 NOT FOUND_ |

    ```json
    {
      "message": "Developer not found."
    }
    ```

#

### **GET - /projects/:id**

- **Sucesso**:
  - Retorno esperado: um objeto contendo todos os dados relacionados ao projeto e o nome do desenvolvedor;
  - Status esperado: _200 OK_
- **Falha**:
  - Caso o id não pertença a um project cadastrado
    - Retorno esperado: um objeto contendo a chave **_message_** com uma mensagem adequada;
    - Status esperado: _404 NOT FOUND_.
- **Exemplos de retornos**:

  - Listando um projeto com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _200 OK_ |

    ```json
        {
            "projectId": 1,
            "projectName": "Projeto 1",
            "projectDescription": "Projeto fullstack",
            "projectRepository": "url.com.br",
            "projectStartDate": "2023-12-02T03:00:00.000Z",
            "projectEndDate": null,
            "projectDeveloperName": "ugo"
        },
    ```

  - Tentando listar com um projectId inválido:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _404 NOT FOUND_ |

    ```json
    {
      "message": "Project not found."
    }
    ```

#

### **PATCH - /projects/:id**

- **Sucesso**:
  - Retorno esperado: objeto contendo todos os dados do projeto que foi atualizado;
  - Status esperado: _200 OK_
- **Falha**:
  - Caso o id informado na url não pertence à um projeto cadastrado
    - Retorno esperado: um objeto contendo a chave **_message_** com uma mensagem adequada;
    - Status esperado: _404 NOT FOUND_.
  - Caso o developerId informado no body não pertença à um developer cadastrado
    - Retorno esperado: um objeto contendo a chave **_message_** com uma mensagem adequada;
    - Status esperado: _404 NOT FOUND_.
- **Exemplos de retornos**:
  | Dados de entrada: |
  | ----------------- |
  | Body: Formato Json |

  ```json
  {
    "name": "Novo nome",
    "description": "Nova descrição",
    "repository": "novaurl.com.br",
    "startDate": "2022-11-13",
    "endDate": "2023-11-13",
    "developerId": 2
  }
  ```

  - Atualizando um projeto com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _200 OK_ |

  ```json
  {
    "id": 1,
    "name": "Novo nome",
    "description": "Nova descrição",
    "repository": "novaurl.com.br",
    "startDate": "2022-11-13T03:00:00.000Z",
    "endDate": "2023-11-13T03:00:00.000Z",
    "developerId": 2
  }
  ```

  - Tentando atualizar com um project id inválido:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _404 NOT FOUND_ |

    ```json
    {
      "message": "Project not found."
    }
    ```

  - Tentando atualizar com um developerId inválido:
    | Dados de entrada: |
    | ----------------- |
    | Body: Formato Json |

    ```json
    {
      "developerId": 9999
    }
    ```

    | Resposta do servidor:        |
    | ---------------------------- |
    | Body: Formato Json           |
    | Status code: _404 NOT FOUND_ |

    ```json
    {
      "message": "Developer not found."
    }
    ```
