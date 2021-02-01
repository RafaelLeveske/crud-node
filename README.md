# CRUD Node

## 📝 Conteúdo

- [About](#about)
- [Getting Started](#getting_started)
- [Built Using](#built_using)
- [Author](#authors)
- [Acknowledgement](#acknowledgement)

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

# Crie uma instância redis usando docker
$ docker run --name crud-node-redis -p 6379:6379 -d -t redis:alpine

# Inicie o servidor
$ yarn dev:server
```

## ⛏️ Built Using <a name = "built_using"></a>

- [Node](https://nodejs.org/en/) - Javascript Runtime Environment.
- [Express](https://expressjs.com/pt-br/) - Framework Web.
- [TypeORM](https://typeorm.io/#/) - ORM for Typescript.
- [MongoDB](https://www.mongodb.com/2) - A fully managed NO-SQL database service.
- [JWT](https://jwt.io/) - JSON Web Token.

## ✍️ Author <a name = "authors"></a>

- [@RafaelLeveske](https://github.com/RafaelLeveske)
- [Linkedin](https://www.linkedin.com/in/rafael-vieira-506331182/)
