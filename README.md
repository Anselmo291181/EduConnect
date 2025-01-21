# Sistema para Gestão Educacional - EduConnect

É uma aplicação Node.js que simula um Sistema de Gestão Educacional, permitindo que os docentes possam interagir com os seus alunos e gerenciar suas **postagens**. A solução foi desenvolvida utilizando a linguagem de programação JS, banco de dados MongoDB (Atlas), Express.js e testes sendo executados via pipeline no GitHub Actions.

## Requisitos

Disponibilizar endpoint para inclusão de um novo usuário para uso da aplicação, bem como endopoints para alteração, exclusão e busca por Id do **Usuário**.

Disponibilizar endpoints para inclusão, alteração, exclusão, busca por Id, busca por palavras-chave e listagem de **Posts**.

### Recursos:
* Gerenciar usuários
* Gerenciar postagens

### Regras de negócio:
* Para efetuar login no Sistema, o usuário deverá possuir cadastro e ter um e-mail válido para autenticação na aplicação.
* Somentes após efeturar login o usuário poderá gerenciar as Postagens.
* Para criar, atualizar e excluir uma nova Postagem, deverá ser informado o usuário do tipo Professor.
* Alunos poderão listar as postagens dos professores, tanto por Id, como listagem geral de todos os posts e também fazer buscas por palavras-chave.

### Tipos de Usuários:

* Professores
* Alunos

## Critérios de aceite:

Para cadastro de um novo **usuário** na plataforma, deverá ser informado o nome, e-mail e uma senha:

**POST /User**
```
{
  "name": "João Silva",
  "email": "joao.silva@email.com",
  "password": "********"
}

```

Para efetuar **login**, deverá ser informado o e-mail cadastrado:

**POST / Login**

```
{
  "email": "joao.silva@email.com"
}
```

Após isso, caso o e-mail esteja cadastrado no banco de dados do sistema, o sistema retornará o *token* de acesso que possui validade de 8 horas, conforme exemplo abaixo, com informações do usuário logado:

````
{
  "authenticated": true,
  "created": "2024-07-21 16:29:05",
  "expirationDate": "2024-07-22 00:29:05",
  "acessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJqb2FvLnNpbHZhQGVtYWlsLmNvbSIsImpvYW8uc2lsdmFAZW1haWwuY29tIl0sImp0aSI6ImM5Njg1MWNhLTVmNzUtNDk0YS05ZTlhLWI5NWNhMmUwOTJlZSIsIm5iZiI6MTcyMTU5MDE0NSwiZXhwIjoxNzIxNjE4OTQ1LCJpYXQiOjE3MjE1OTAxNDUsImlzcyI6IkV4ZW1wbG9Jc3N1ZXIiLCJhdWQiOiJFeGVtcGxvQXVkaWVuY2UifQ.cwQz5878YWdfZfSxEIJnEsvHxD__TX0HbWyWSepqBQDvG9fdTc54-fWICZLi40Msra-xWYjbRDmiSbvjVd_Jmd2Ow-bifaYXZEPQSbpK7jLfVP1Nhccgt6GlQLWtT4h6BsEQR61j70pLNU1L81CP-zJRx6irCM82O_zbD-R2e9iucKOVVuRh_tFOOgReX1eIbxkJVUMOsAVpXX214utC8wqQhnyCxoY12cM1V9QMux2UYj2B8imVo0NAOC7n50FW8BZ8urOEgugX45y8ER0i4biZTUW6qCwe0T-QGA6pkFMvbfY2FWVEmQgrUBheTc6kKQxpbrCq5HAngM6kowD3vg",
  "userName": "joao.silva@email.com",
  "name": "João Silva",
  "message": "Usuário Logado com sucesso"
}
````

Deverá ser copiado o *acessToken* e clicar no botão **Authorize** passando as informações necessárias conforme exemplo abaixo:

````
Bearer (apiKey)
Entre com o Token JWT
Name: Authorization
In: header
Value: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJqb2FvLnNpbHZhQGVtYWlsLmNvbSIsImpvYW8uc2lsdmFAZW1haWwuY29tIl0sImp0aSI6ImM5Njg1MWNhLTVmNzUtNDk0YS05ZTlhLWI5NWNhMmUwOTJlZSIsIm5iZiI6MTcyMTU5MDE0NSwiZXhwIjoxNzIxNjE4OTQ1LCJpYXQiOjE3MjE1OTAxNDUsImlzcyI6IkV4ZW1wbG9Jc3N1ZXIiLCJhdWQiOiJFeGVtcGxvQXVkaWVuY2UifQ.cwQz5878YWdfZfSxEIJnEsvHxD__TX0HbWyWSepqBQDvG9fdTc54-fWICZLi40Msra-xWYjbRDmiSbvjVd_Jmd2Ow-bifaYXZEPQSbpK7jLfVP1Nhccgt6GlQLWtT4h6BsEQR61j70pLNU1L81CP-zJRx6irCM82O_zbD-R2e9iucKOVVuRh_tFOOgReX1eIbxkJVUMOsAVpXX214utC8wqQhnyCxoY12cM1V9QMux2UYj2B8imVo0NAOC7n50FW8BZ8urOEgugX45y8ER0i4biZTUW6qCwe0T-QGA6pkFMvbfY2FWVEmQgrUBheTc6kKQxpbrCq5HAngM6kowD3vg
````

Após isso, os demais endpoints da aplicação estarão liberados para uso.

Para criação de um **post**, deverá ser informado titulo, conteúdo e autor, conforme exemplo abaixo:

**POST /post**

````
{
    "titulo": "Post exemplo",
    "conteudo": "Decrição do post exemplo",
    "autor": "João da Silva"
}
````

Para alteração de um **post**, deverá ser informado o _id, titulo, conteúdo e autor, conforme exemplo abaixo:

**PUT /posts/678ea411faa5446675710a98**

````
{
    "titulo": "Post alterado",
    "conteudo": "Decrição do post alterado",
    "autor": "José Souza"
}
````

Para listagem dos **posts**, realizar uma busca conforme exemplo abaixo:

**GET /posts/**

````
[
    {
        "_id": "678e7df66afd88825622e9c8",
        "titulo": "Post 1",
        "conteudo": "Conteúdo do post 1",
        "autor": "Fulano"
    },
    {
        "_id": "678e89e26afd88825622e9ca",
        "titulo": "Post 2",
        "conteudo": "Descrição post 2",
        "autor": "Cicrano"
    },
    {
        "_id": "678ea4cbfaa5446675710a9b",
        "titulo": "Post 3",
        "conteudo": "Decrição do post 3",
        "autor": "Beltrano"
    }
]
````

Para exclusão de um **post**, deverá ser informado o _id do post, conforme exemplo abaixo:

**DELETE /posts/678ea411faa5446675710a98**

````
{
    "message": "Post excluído com sucesso!"
}
````

Para busca por palavra-chave de um **post**, deverá ser informado o termo conforme exemplo abaixo:

**GET /posts/search/teste**

````
{
    "_id": "678ea4cbfaa5446675710a9b",
    "titulo": "Post teste",
    "conteudo": "Decrição do post teste",
    "autor": "Beltrano"
}
````

Para busca por Id de um **post**, deverá ser informado o _id do post, conforme exemplo abaixo:

**GET /posts/678e7df66afd88825622e9c8**

````
{
    "_id": "678e7df66afd88825622e9c8",
    "titulo": "Post 1",
    "conteudo": "Conteúdo do post 1",
    "autor": "Fulano"
}
````

## Execução:
Abra o repositório do projeto EduConnect, preferencialmente na última versão do VSCode.

Ter instalado o Node, de preferência a versão 22.13.0 ou posterior.

Altere a string de conexão (CONNECTION_STRING) da base de dados no arquivo .env na raiz do projeto, e substitua o username e password conforme exemplo abaixo:

````
Path: .env

DB_CONNECTION_STRING=mongodb+srv://<username>:<password>@cluster0.qcjkq.mongodb.net/post?retryWrites=true&w=majority&appName=Cluster0

````

## Banco de dados:

MongoDB Atlas - Apresentação aula