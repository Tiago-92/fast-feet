/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Update Delivred Driver (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let delivererId: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()

    const user = await prisma.user.create({
      data: {
        name: 'Entregador 1',
        email: 'entregador@fast.com',
        password: '123456',
        role: 'DELIVERED_DRIVER',
        latitude: '84d84de5d4e5d4e54dcec',
        longitude: 'dedececcd44ccececascc',
        phone: '429XXXXXX45',
      },
    })
    delivererId = user.id
  })

  test('[PUT] /delivered-driver/update/:id', async () => {
    const response = await request(app.getHttpServer())
      .put(`/delivered-driver/update/${delivererId}`)
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
