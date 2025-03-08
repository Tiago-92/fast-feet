import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { UserRole } from '@prisma/client'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Authenticate (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()

    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'joão@teste.com',
        password: await hash('123456', 8),
        latitude: 'sdsdasdsds71',
        longitude: 'dedeadweded5',
        role: UserRole.DELIVERED_DRIVER,
        phone: '429XXXX567',
      },
    })
  })

  test('[POST] /sessions', async () => {
    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'joão@teste.com',
      password: '123456',
    })

    const userOnDatabase = await prisma.user.findFirst({
      where: {
        email: 'joão@teste.com',
      },
    })

    expect(userOnDatabase).toBeTruthy()
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
