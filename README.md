# Sistema para Gestão Educacional - EduConnect

EduConnect é uma aplicação Node.js que simula um Sistema de Gestão Educacional, permitindo que docentes interajam com seus alunos e gerenciem suas postagens. A solução foi desenvolvida utilizando JavaScript, MongoDB (Atlas), Express.js, Docker e testes automatizados com GitHub Actions.

## Requisitos:
- Endpoint para inclusão de um novo usuário.
- Endpoints para alteração, exclusão e busca por id de usuário.
- Endpoints para inclusão, alteração, exclusão, busca por id, busca por palavras-chave e listagem de posts.

## Funcionalidades:
- Gerenciamento de usuários
- Gerenciamento de postagens
- Gerenciamento de autores

## Regras de Negócio:
- O usuário deve ter um cadastro válido (nome, e-mail e senha) para efetuar o login.
- O login só é possível se o e-mail for válido e cadastrado no sistema.
- Após o login, o usuário pode gerenciar as postagens.
- Apenas usuários autenticados podem criar, atualizar e excluir postagens.
- Alunos podem listar postagens de professores por id ou palavras-chave.

## Tipos de Usuários:
- Professores
- Alunos

## Critérios de Aceite

**Cadastro de Usuário**
Para cadastrar um novo usuário, devem ser informados nome, e-mail e senha:
````
POST http://localhost:3000/User

{
  "name": "João Silva",
  "email": "joao.silva@email.com",
  "password": "********"
}
````
**Login de Usuário**
Para realizar o login, deve ser informado e-mail e senha:
````
POST http://localhost:3000/auth/login

{
  "email": "joao.silva@email.com",
  "senha": "sua_senha"
}
````
Se o login for bem-sucedido, o sistema retornará o token de acesso com validade de 8 horas:
````
{
  "acessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTNkN2UxMTEzOGUzMzljMWQ1ZDFhMiIsImVtYWlsIjoicGVyZWlyYS5tYXRldXNyYW1vc0BnbWFpbC5jb20iLCJpYXQiOjE3MzgyODE2NjYsImV4cCI6MTczODM2ODA2Nn0.i_qlCmrpOwDzUzAgbqdRLQGrKJdZ5VSyCRw_KIyLiJ8"
}
````
**Utilização do Token**
Para acessar endpoints que exigem autenticação, use o Bearer token no cabeçalho:
````
Authorization: Bearer <seu_acessToken>
````
**Criação de Postagem**
Para criar um novo post, devem ser informados título, conteúdo e autor:
````
POST http://localhost:3000/post

{
  "titulo": "Post 1",
  "conteudo": "Descrição do post 1",
  "autor": "67940bad55c2d7b32e749558"
}
````
**Alteração de Postagem**
Para alterar um post, deve-se fornecer id, título, conteúdo e autor:
````
PUT http://localhost:3000/posts/67940bb855c2d7b32e74955b

{
  "titulo": "Post alterado",
  "conteudo": "Descrição do post alterado",
  "autor": "67940bad55c2d7b32e749558"
}
````
**Listagem de Postagens**
Para listar as postagens:
````
GET http://localhost:3000/posts/

[
  {
    "_id": "67940bb855c2d7b32e74955b",
    "titulo": "Post 1",
    "conteudo": "Descrição do post 1",
    "autor": {
      "nome": "Autor 1",
      "email": "autor1@email.com",
      "senha": "******",
      "_id": "67940bad55c2d7b32e749558"
    }
  },
  {
    "_id": "67940bb855c2d7b32e74955b",
    "titulo": "Post 2",
    "conteudo": "Descrição do post 2",
    "autor": {
      "nome": "Autor 2",
      "email": "autor2@email.com",
      "senha": "******",
      "_id": "67940bad55c2d7b32e749558"
    }
  }
]
````
**Exclusão de Postagem**
Para excluir um post, deve-se fornecer o id do post:
````
DELETE http://localhost:3000/posts/678ea411faa5446675710a98

{
  "message": "Post excluído com sucesso!"
}
````
**Busca de Postagens por Palavra-chave**
Para buscar posts por palavra-chave:
````
GET http://localhost:3000/posts/search/teste

{
  "_id": "678ea4cbfaa5446675710a9b",
  "titulo": "Post exemplo",
  "conteudo": "Descrição do post exemplo",
  "autor": "67940bad55c2d7b32e749558"
}
````
**Busca de Postagem por Id**
Para buscar um post pelo id:
````
GET http://localhost:3000/posts/678e7df66afd88825622e9c8

{
  "_id": "679bb3bfbd1182e863646da9",
  "titulo": "Post 1",
  "conteudo": "Descrição do post exemplo 1",
  "autor": {
    "nome": "Autor 2",
    "email": "autor2@email.com",
    "_id": "679bb29ce70dea698d93fdc7"
  }
}
````
# Execução

**Requisitos**
* Node.js (preferencialmente versão 22.13.0 ou posterior)

**Configuração**
* Clone o repositório.
* No arquivo .env, substitua a string de conexão com o banco de dados:
````
DB_CONNECTION_STRING=mongodb+srv://<username>:<password>@cluster0.qcjkq.mongodb.net/post?retryWrites=true&w=majority&appName=Cluster0
````
# Execução
**Para rodar a API localmente:**
````
npm install
npm start  # ou npm run dev
````
**Execução com Docker**
Construa a imagem Docker:
````
docker build -t apieduconnect .

Rode o container:

docker run -d --name api-container -p 3000:3000 apieduconnect
````
# Banco de Dados: 
**MongoDB Atlas**

* Passo 1: Criar Conta no MongoDB Atlas
Acesse o MongoDB Atlas - https://account.mongodb.com/account/login - e crie uma conta ou faça login.

* Passo 2: Criar Projeto
Após login, clique em Create a New Project.
Dê um nome ao projeto (ex: EduConnect) e clique em Create Project.

* Passo 3: Criar Cluster
Clique em Build a Cluster.
Escolha a opção Free Cluster e configure a nuvem e região desejadas.

* Passo 4: Criar Banco de Dados
Após o cluster ser criado, configure o Database Access e crie um usuário com permissões adequadas.
Configure o Network Access para permitir o acesso ao banco.

* Passo 5: Conectar à Aplicação
Vá para Clusters e clique em Connect.
Escolha Connect your application.
Copie a string de conexão fornecida e substitua <username>, <password> e <database> com os valores correspondentes.
