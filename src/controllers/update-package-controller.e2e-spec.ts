/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppModule } from '@/app.module'
import { PackageStatusEnum } from '@/domain/enums/package-status-enum'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Update Delivred Driver (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let packageId: string
  let delivererId: string
  let recipientId: string

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

    const packageContent = await prisma.package.create({
      data: {
        title: 'Embalagem teste 1',
        content: 'Embalagem teste 1',
        status: PackageStatusEnum.DELIVERED,
        delivererId,
        recipientId,
      },
    })
    packageId = packageContent.id
  })

  test('[PUT] /package/update/:id', async () => {
    const response = await request(app.getHttpServer())
      .put(`/package/update/${packageId}`)
      .send({
        title: 'Embalagem teste 1 atualizada',
        content: 'Embalagem teste 1 atualizada',
      })

    const packageUpdated = await prisma.package.findFirst({
      where: {
        title: 'Embalagem teste 1 atualizada',
        content: 'Embalagem teste 1 atualizada',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(packageUpdated).toBeTruthy()
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.objectContaining({
          value: expect.any(String),
        }),
        props: expect.objectContaining({
          title: 'Embalagem teste 1 atualizada',
          content: 'Embalagem teste 1 atualizada',
        }),
      }),
    )
  })
})
