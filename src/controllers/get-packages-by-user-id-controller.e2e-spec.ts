import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PackageStatus, UserRole } from '@prisma/client'
import request from 'supertest'

describe('Fetch all packages by User ID (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let recipientId: string
  let recipientId2: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()

    const recipient = await prisma.user.create({
      data: { 
        name: 'Recipient Test', 
        email: 'recipient@example.com',
        password: 'testpassword',
        role: UserRole.RECIPIENT,
        latitude: '0.0000',
        longitude: '0.0000',
        phone: '1234567890', 
      },
    })
    recipientId = recipient.id

    const deliverer = await prisma.user.create({
      data: {
        id: 'dc8ec4s5xs5x4s5xa5cc88',
        name: 'Deliverer Test',
        email: 'deliverer@example.com',
        password: 'testpassword',
        role: UserRole.DELIVERED_DRIVER,
        latitude: '0.000000',
        longitude: '0.000000', 
        phone: '1234567890',
      },
    })

    await prisma.package.deleteMany({ where: { recipientId } })

    await prisma.package.createMany({
      data: [
        {
          id: '1',
          title: 'Embalagem Teste',
          content: 'Embalagem Teste',
          status: PackageStatus.AWAITING_PICKUP,
          delivererId: deliverer.id,
          recipientId,
          latitude: '8521574666147',
          longitude: '-12648486654',
        },
        {
          id: '2',
          title: 'Embalagem Teste 2',
          content: 'Embalagem Teste 2',
          status: PackageStatus.AWAITING_PICKUP,
          delivererId: deliverer.id,
          recipientId,
          latitude: '8878456615122',
          longitude: '-988841556565',
        },
      ],
    })
  })

  afterAll(async () => {
    await prisma.package.deleteMany({ where: { recipientId } })
    await prisma.user.delete({ where: { id: recipientId } })
    await app.close()
  })

  test('[GET] /packages/user/:id', async () => {
    const response = await request(app.getHttpServer()).get(
      `/packages/user/:id/${recipientId}`,
    )

    /* expect(response.status).toBe(200) */
    expect(response.body).toHaveLength(2)

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Embalagem Teste',
          status: PackageStatus.AWAITING_PICKUP,
          recipientId,
        }),
        expect.objectContaining({
          title: 'Embalagem Teste 2',
          status: PackageStatus.AWAITING_PICKUP,
          recipientId,
        }),
      ]),
    )
  })
})
