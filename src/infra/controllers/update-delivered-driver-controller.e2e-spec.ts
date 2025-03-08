/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { UserFactory } from 'test/factories/user-factory'

describe('Update Delivred Driver (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let delivererId: string
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [UserFactory, PrismaService],
    }).compile()

    userFactory = moduleRef.get(UserFactory)
    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[PUT] /delivered-driver/update/:id', async () => {
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
      .put(`/delivered-driver/update/${delivererId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Jane Doe',
        email: 'janedoe@example.com',
      })

    const userUpdated = await prisma.user.findFirst({
      where: {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(userUpdated).toBeTruthy()
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.objectContaining({
          value: expect.any(String),
        }),
        props: expect.objectContaining({
          name: 'Jane Doe',
          email: 'janedoe@example.com',
        }),
      }),
    )
  })
})
