# CRUD Node

## 📝 Conteúdo

- [About](#about)
- [Getting Started](#getting_started)
- [Built Using](#built_using)
- [Author](#authors)

---

## 🏁 About <a name = "about"></a>

- Esse projeto é destinado a cadastro e autenticação de usuários os quais poderão cadastrar suas empresas, produtos e serviços, assim como listar, editar e deletar.

- As empresas podem conter um ou mais produtos, assim como cada produto pode conter um ou mais serviços.
- O usuario pode ver somente suas empresas e produtos.

## 🏁 Getting Started <a name = "getting_started"></a>
Para clonar e utilizar essa aplicação você irá precisar do [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) + [Yarn](https://yarnpkg.com/) instalados em sua máquina.

Abra o seu terminal para iniciar.

### Install API

```bash
# Clone o repositório
$ git clone https://github.com/RafaelLeveske/crud-node.git

# Installe as dependências
$ yarn install

# Execute os testes
$ yarn test

# Crie a database
Crie as databases com o mesmo nome do arquivo ormconfig.json.

# Crie uma instância mongoDB usando docker
$ docker run --name crud-node-mongodb -p 27017:27017 -d -t mongo

# Inicie o servidor
$ yarn dev:server
```

## ⛏️ Built Using <a name = "built_using"></a>

- [Node](https://nodejs.org/en/) - Javascript Runtime Environment.
- [TypeScript](https://www.typescriptlang.org/) - Open-source language which builds on JavaScript
- [Express](https://expressjs.com/pt-br/) - Framework Web.
- [Mongoose](https://mongoosejs.com/) - Mongodb object modeling for node.js.
- [MongoDB](https://www.mongodb.com/2) - A fully managed NO-SQL database service.
- [JWT](https://jwt.io/) - JSON Web Token.
- [Eslint](https://eslint.org/) - Find and fix problems in your JavaScript code
- [Prettier](https://prettier.io/) - An opinionated code formatter
- [EditorConfig](https://editorconfig.org/) - Helps maintain consistent coding styles for multiple developers
- [Jest](https://jestjs.io/) - JavaScript Testing Framework with a focus on simplicity.
- [uuid v4](https://github.com/thenativeweb/uuidv4/) - Creates v4 UUIDs


## ✍️ Author <a name = "authors"></a>

Made by Rafael Vieira 👋 [See my linkedin](https://www.linkedin.com/in/rafael-vieira-506331182/)
