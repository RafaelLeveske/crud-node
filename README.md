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

### Configurações para rodar a aplicação em desenvolvimento:

```bash
# Clone o repositório
$ git clone https://github.com/RafaelLeveske/crud-node.git

# Acesse a pasta do projeto
$ cd crud-node

# Installe as dependências
$ yarn

# Crie uma instância mongoDB usando docker
$ docker run --name crud-node-mongodb -p 27017:27017 -d -t mongo

# Ou crie um novo cluster no MongoDB Atlas.
```


## Configure as variáveis de ambiente
- A primeira coisa a se fazer é copiar o conteúdo do arquivo .env.example para um novo arquivo na raiz do seu projeto chamado .env.
- Em seguida vamos configurar as varivaeis de ambiente relacionadas a APP CONFIGURATIONS.
- Forneça as informações relacionadas a APP_PORT a qual se refere a porta a qual a aplicação ira rodar, por parão a aplicação usa a porta 3333.
- Forneça as informações relacionadas ao APP_JWT_SECRET a qual se refere ao segredo da chave JWT a qual controla a nossa autenticação no app, a escolha do valor dessa variavel fica ao seu critério, caso o deixe vazio a aplicação irá usar um valor default como chave.
- Em seguida vamos configurar as varivaveis relacionadas ao banco MongoDB, podendo esse ser executado tanto em localhost com a instância mongodb docker ou com um cluster MongoDB Atlas.
- A proxima variavel em questão DB_DRIVER, se trata da variavel de driver do banco, podendo esse ser um dos dois valores: (localhost, atlas) o valor (localhost), foi programado para rodar com a instância mongodb a qual temos a opção de criar via Docker, já o valor (atlas) foi programado para rodar com um cluster MongoDB Atlas, caso deixe a variavel fazia, a aplicação usará o valor (localhost) por padrão, portanto é muito importante indicar o valor corretamente.
- Caso opte por executar a aplicação localmente a unica configuração restante será MONGO_DB_DATABASE_NAME a qual você irá indicar o nome do banco do seu banco de dados.
- Caso opte por executar a aplicação via MongoDB Atlas, indique os valores de: MONGO_DB_ATLAS_NAME a qual se refere ao nome da sua database Atlas, MONGO_DB_ATLAS_USER a qual se refere ao nome de usuário, MONGO_DB_ATLAS_PASS se refere ao password e MONGO_DB_ATLAS_CLUSTER a qual se refere ao nome do seu cluster.

# Para príncipios de referencia as strings URIs de conexão Mongo na aplicação tem o seguinte modelo:

# localhost:
- mongodb://localhost:27017/${process.env.MONGO_DB_DATABASE_NAME}

# atlas:
- mongodb+srv://${process.env.MONGO_DB_ATLAS_USER}:${process.env.MONGO_DB_ATLAS_PASS}@${process.env.MONGO_DB_ATLAS_CLUSTER}.mongodb.net/${process.env.MONGO_DB_ATLAS_NAME}?retryWrites=true&w=majority


```bash
# Execute os testes
$ yarn test

# Inicie o servidor
$ yarn dev:server
```

#### ATENÇÃO: As configurações de produção são totalmente orientadas para o uso com o [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), por isso será necessário a criação de um cluster na mesma para a realização dos próximos passos. Portanto crie o seu cluster MongoDB Atlas e em seguida insira as informações pertinentes no arquivo .env, o qual foi explicado no passo anterior.

### Configurações para rodar a aplicação em produção:

```bash
# Crie uma imagem da aplicação via Dockerfile, executando no terminal o comando abaixo:
$ docker build -t crud-node/api .

# Inicie o container.
$ docker run -p 3333:3333 -d crud-node/api

# Caso o terminal mostre a mensagem: Server Online on Port 3333, significa que o servidor foi executado em um container Docker com sucesso!
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
