# Todo Experience

### Tecnologias utilizadas

- NodeJS
- Typescript
- Express
- Typeorm
- Principios SOLID
- Arquitetura DDD

## Primeiros Passos

Instalar dependencias:

> yarn

## Banco de dados

Com docker: Em desenvolvimento*

Sem Docker: Instalação do PostgreSQL

Renomar arquivo .env.example para .env

Criar Database

> CREATE DATABSE todo

Criar tabelas no Postgres utilizando migrations do TypeOrm
> yarn typeorm migration:run

Criar usuario administrador por padrão (email: admin@todoexperience.com.br, password: verificar .env)
> yarn seed:admin

## Iniciar Aplicação

Gerar arquivo de build e inicializar aplicação
> yarn build

> yarn start

## Pendencias

- [] Docker
- [] Testes de integração

## Observações
- Collection criada a partir do Insomnia está dispónivel na pasta docs.

