Rotas Login:
http://localhost:3000/auth/signin
http://localhost:3000/auth/signup

Rotas Autenticadas:
http://localhost:3000/v1/users
http://localhost:3000/v1/products

Comandos utilizados:

// Criação de tabela
yarn db:create

// Criação de model e migration
yarn sequelize-cli model:generate --name User --attributes name:string,email:string,passwd:string
yarn sequelize-cli model:generate --name Product --attributes name:string,quantity:integer

yarn sequelize-cli model:generate --name Teste --attributes name:string,email:string,passwd:string

// Rodar migration
yarn db:migrate

// Criação de seeds
yarn db:g:seed sample-users
yarn db:g:seed sample-products

// Rodar seeds
yarn db:seeds

// Exemplo de alteração da model
yarn db:g:migration addColumnValueTableProducts

// Guia:
https://blog.echobind.com/a-guide-for-restful-apis-with-node-sequelize-postgres-63636d026d5d
