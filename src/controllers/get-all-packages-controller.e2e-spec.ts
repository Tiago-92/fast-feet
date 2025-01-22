import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PackageStatus } from '@prisma/client'
import request from 'supertest'

describe('Get All Packages (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let delivererId: string
  let recipientId: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()

    await prisma.package.deleteMany()

    const deliverer = await prisma.user.create({
      data: {
        name: 'Entregador 1',
        email: 'entregador@fast.com',
        password: '123456',
        role: 'DELIVERED_DRIVER',
      },
    })
    delivererId = deliverer.id

    const recipient = await prisma.user.create({
      data: {
        name: 'Destinatário 1',
        email: 'destinatario@fast.com',
        password: '123456',
        role: 'RECIPIENT',
      },
    })
    recipientId = recipient.id

    await prisma.package.create({
      data: {
        title: 'Embalagem 1',
        content: 'Embalagem 1',
        status: PackageStatus.AWAITING_PICKUP,
        delivererId,
        recipientId,
      },
    })

    await prisma.package.create({
      data: {
        title: 'Embalagem 2',
        content: 'Embalagem 2',
        status: PackageStatus.RETURNED,
        delivererId,
        recipientId,
      },
    })
  })

  afterAll(async () => {
    await prisma.package.deleteMany()
    await app.close()
  })

  test('[GET] /all-packages should return all packages', async () => {
    const response = await request(app.getHttpServer()).get('/all-packages')

    expect(response.status).toBe(200)
    expect(response.body.value.packages).toHaveLength(2)
  })
})
