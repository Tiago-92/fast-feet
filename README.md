<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
</p>

## Get Start

Requisitos: Docker, Docker Compose, Node.js, pnpm

```bash
# Baixar as dependências do Node.js
pnpm install

# Executar as migrations do Prisma
npx prisma migrate dev

# Iniciar o container docker do PostegreSQL, Redis e RabbitMQ e iniciar o projeto Nest.js  
sh dev start

# Executar os testes unitários
pnpm run test

# Executar os testes E2E
pnpm run test:e2e
```

## Regras da aplicação

- [x] A aplicação deve ter dois tipos de usuário, entregador e/ou admin
- [x] Deve ser possível realizar login com CPF e Senha
- [x] Deve ser possível realizar o CRUD dos entregadores
- [x] Deve ser possível realizar o CRUD das encomendas
- [x] Deve ser possível realizar o CRUD dos destinatários
- [x] Deve ser possível marcar uma encomenda como aguardando (Disponível para retirada)
- [x] Deve ser possível retirar uma encomenda
- [x] Deve ser possível marcar uma encomenda como entregue
- [x] Deve ser possível marcar uma encomenda como devolvida
- [x] Deve ser possível listar as encomendas com endereços de entrega próximo ao local do entregador
- [x] Deve ser possível alterar a senha de um usuário
- [x] Deve ser possível listar as entregas de um usuário
- [x] Deve ser possível notificar o destinatário a cada alteração no status da encomenda

## Regras de negócio

- [x] Somente usuário do tipo admin pode realizar operações de CRUD nas encomendas
- [x] Somente usuário do tipo admin pode realizar operações de CRUD dos entregadores
- [x] Somente usuário do tipo admin pode realizar operações de CRUD dos destinatários
- [x] Para marcar uma encomenda como entregue é obrigatório o envio de uma foto
- [x] Somente o entregador que retirou a encomenda pode marcar ela como entregue
- [x] Somente o admin pode alterar a senha de um usuário
- [ ] Não deve ser possível um entregador listar as encomendas de outro entregador

## Tecnologias

- TypeScript
- Node.js
- Nest.js
- PostgreSQL
- Prisma ORM
- Docker
- Vitest
- Zod
- Redis
- RabbitMQ
- Supertest