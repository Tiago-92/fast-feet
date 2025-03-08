/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import request from 'supertest'
import { UserFactory } from 'test/factories/user-factory'
import { hash } from 'bcryptjs'

describe('Create Package (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let delivererId: string
  let recipientId: string
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
  })

  test('[POST] /packages', async () => {
    const hashedPassword = await hash('123545', 10)
    const deliveredDriver = await userFactory.makePrismaUser({
      email: 'jose@teste.com',
      password: hashedPassword,
    })
    delivererId = deliveredDriver.id.toString()

    const recipient = await userFactory.makePrismaUser({
      role: 'RECIPIENT',
    })
    recipientId = recipient.id.toString()

    const authResponse = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'jose@teste.com',
        password: '123545',
      })

    const accessToken = authResponse.body.access_token
    if (!accessToken) {
      throw new Error('Access token not returned')
    }

    const response = await request(app.getHttpServer())
      .post('/packages')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Pacote 01 Exemplo',
        content: 'Contéudo exemplo',
        status: 'DELIVERED',
        delivererId: deliveredDriver.id.toString(),
        recipientId: recipient.id.toString(),
        latitude: 'csdcd55cd5c15dc',
        longitude: 'ded8c4xz5c1e8x1w',
      })

    const packageOnDatabase = await prisma.package.findFirst({
      where: {
        content: 'Contéudo exemplo',
      },
    })

    expect(response.statusCode).toBe(201)
    expect(packageOnDatabase).toBeTruthy()
  })
})
