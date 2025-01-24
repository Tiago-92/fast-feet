import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Fetch Delivered Driver by ID (E2E)', () => {
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

    await prisma.user.deleteMany()

    const deliverer = await prisma.user.create({
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

    delivererId = deliverer.id
  })

  test('[GET] /delivered-driver/fetch/:id', async () => {
    const response = await request(app.getHttpServer()).get(
      `/delivered-driver/fetch/${delivererId}`,
    )

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      value: {
        user: {
          props: {
            name: 'Entregador 1',
            email: 'entregador@fast.com',
            role: 'DELIVERED_DRIVER',
          },
        },
      },
    })
  })
})
