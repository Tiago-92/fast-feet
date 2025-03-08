/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { UserFactory } from 'test/factories/user-factory'

describe('Delete Delivered Driver (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let delivererId: string
  let userFactory: UserFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [UserFactory, PrismaService],
    }).compile()

    userFactory = moduleRef.get(UserFactory)
    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()

    await prisma.user.deleteMany()
  })

  test('[DELETE] /delivered-driver/:id - Should delete delivered driver successfully', async () => {
    const hashedPassword = await hash('123545', 10)
    const deliveredDriver = await userFactory.makePrismaUser({
      email: 'jose@teste.com',
      password: hashedPassword,
    })
    delivererId = deliveredDriver.id.toString()

    const authResponse = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'jose@teste.com',
        password: '123545',
      })
    const accessToken = authResponse.body.access_token

    const response = await request(app.getHttpServer())
      .delete(`/delivered-driver/${delivererId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      message: 'Entregador removido com sucesso.',
    })

    const deletedDriver = await prisma.user.findUnique({
      where: { id: delivererId },
    })

    expect(deletedDriver).toBeNull()
  })
  /*  test('[DELETE] /delivered-driver/:id - Should return 404 for invalid ID', async () => {
    // Authenticate and get the JWT token
    const authResponse = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'jose@teste.com',
        password: '123545',
      })
    const accessToken = authResponse.body.access_token

    // Try to delete using an invalid ID
    const response = await request(app.getHttpServer())
      .delete(`/delivered-driver/invalid-id`)
      .set('Authorization', `Bearer ${accessToken}`)

    // Assert 404 error response
    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      statusCode: 404,
      message: 'Entregador não encontrado.',
      error: 'Not Found',
    })
  }) */
})
