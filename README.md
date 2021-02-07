# CRUD Node

## 📝 Conteúdo

- [About](#about)
- [Getting Started](#getting_started)
- [Built Using](#built_using)
- [Author](#authors)

---

## 🏁 About <a name = "about"></a>

- Esse projeto é destinado a cadastro e autenticação de usuários os quais poderão cadastrar e gerenciar suas empresas, produtos e serviços, assim como listar, editar e deletar.

- As empresas podem conter um ou mais produtos, assim como cada produto pode conter um ou mais serviços.

## 🏁 Getting Started <a name = "getting_started"></a>
Para clonar e utilizar essa aplicação você irá precisar do [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Yarn](https://yarnpkg.com/) e [Docker](https://www.docker.com/) instalados em sua máquina.

Abra o seu terminal para iniciar.

### Install API

```bash
# Clone o repositório
$ git clone https://github.com/RafaelLeveske/crud-node.git

# Installe as dependências
$ yarn

# Crie uma instância mongoDB usando docker
$ docker run --name crud-node-mongodb -p 27017:27017 -d -t mongo

# Configure as variáveis de ambiente
- Copie o conteúdo do arquivo .env.example, e cole em um novo arquivo .env na raiz do seu projeto.

# Crie a database
- Crie o nome da sua database MongoDB no arquivo .env.

# Execute os testes
$ yarn test

# Inicie o servidor
$ yarn dev:server
```

## Para testar as rotas da aplicação acesse o link abaixo:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=crud_node&uri=https%3A%2F%2Fraw.githubusercontent.com%2FRafaelLeveske%2Fcrud-node%2Fmaster%2FInsomnia_crud_node)


## ⛏️ Built Using <a name = "built_using"></a>

- [Node](https://nodejs.org/en/) - Javascript Runtime Environment.
- [TypeScript](https://www.typescriptlang.org/) - Open-source language which builds on JavaScript.
- [Express](https://expressjs.com/pt-br/) - Framework Web.
- [Mongoose](https://mongoosejs.com/) - Mongodb object modeling for node.js.
- [MongoDB](https://www.mongodb.com/2) - A fully managed NO-SQL database service.
- [JWT](https://jwt.io/) - JSON Web Token.
- [Eslint](https://eslint.org/) - Find and fix problems in your JavaScript code.
- [Prettier](https://prettier.io/) - An opinionated code formatter.
- [EditorConfig](https://editorconfig.org/) - Helps maintain consistent coding styles for multiple developers.
- [Jest](https://jestjs.io/) - JavaScript Testing Framework with a focus on simplicity.
- [Celebrate](https://www.npmjs.com/package/celebrate) - Express middleware.
- [Lodash](https://lodash.com/) - A modern JavaScript utility library delivering modularity, performance & extras.
- [Tsyringe](https://www.npmjs.com/package/tsyringe) - A lightweight dependency injection container for TypeScript/JavaScript for constructor injection.

## ✍️ Author <a name = "authors"></a>

Made by Rafael Vieira 👋 [See my linkedin](https://www.linkedin.com/in/rafael-vieira-506331182/)
