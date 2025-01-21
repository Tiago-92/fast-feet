<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
</p>

## Regras da aplicação

- [x] A aplicação deve ter dois tipos de usuário, entregador e/ou admin
- [x] Deve ser possível realizar login com CPF e Senha
- [x] Deve ser possível realizar o CRUD dos entregadores
- [x] Deve ser possível realizar o CRUD das encomendas
- [ ] Deve ser possível realizar o CRUD dos destinatários
- [ ] Deve ser possível marcar uma encomenda como aguardando (Disponível para retirada)
- [ ] Deve ser possível retirar uma encomenda
- [ ] Deve ser possível marcar uma encomenda como entregue
- [ ] Deve ser possível marcar uma encomenda como devolvida
- [ ] Deve ser possível listar as encomendas com endereços de entrega próximo ao local do entregador
- [ ] Deve ser possível alterar a senha de um usuário
- [ ] Deve ser possível listar as entregas de um usuário
- [ ] Deve ser possível notificar o destinatário a cada alteração no status da encomenda

## Regras de negócio

- [ ] Somente usuário do tipo admin pode realizar operações de CRUD nas encomendas
- [ ] Somente usuário do tipo admin pode realizar operações de CRUD dos entregadores
- [ ] Somente usuário do tipo admin pode realizar operações de CRUD dos destinatários
- [ ] Para marcar uma encomenda como entregue é obrigatório o envio de uma foto
- [ ] Somente o entregador que retirou a encomenda pode marcar ela como entregue
- [ ] Somente o admin pode alterar a senha de um usuário
- [ ] Não deve ser possível um entregador listar as encomendas de outro entregador

## Stack da aplicação

- TypeScript
- Node.js
- Nest.js
- PostgreSQL
- Docker
- Vitest
- Zod
- Redis
- RabbitMQ
- Supertest