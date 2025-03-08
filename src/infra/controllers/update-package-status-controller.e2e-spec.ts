import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PackageStatus } from '@prisma/client'
import request from 'supertest'

describe('Update Delivred Driver (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let delivererId: string
  let recipientId: string
  let packageId: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()

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

    const recipient = await prisma.user.create({
      data: {
        name: 'Destinatário 1',
        email: 'destinatario@fast.com',
        password: '123456',
        role: 'RECIPIENT',
        latitude: '84d84de5d4e5d4e54dcec',
        longitude: 'dedececcd44ccececascc',
        phone: '429XXXXXX45',
      },
    })
    recipientId = recipient.id

    const packageContent = await prisma.package.create({
      data: {
        title: 'Embalagem teste 1',
        content: 'Embalagem teste 1',
        status: PackageStatus.DELIVERED,
        delivererId,
        recipientId,
        latitude: '84d84de5d4e5d4e54dcec',
        longitude: 'dedececcd44ccececascc',
      },
    })
    packageId = packageContent.id
  })

  test('[PATCH] /status/update/:id', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/status/update/${packageId}`)
      .send({
        status: 'RETURNED',
      })

    const statusUpdated = await prisma.package.findFirst({
      where: {
        status: 'RETURNED',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(statusUpdated).toBeTruthy()
    /* expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.objectContaining({
          value: expect.any(String),
        }),
        props: expect.objectContaining({
          status: 'RETURNED',
        }),
      }),
    ) */
  })
})
