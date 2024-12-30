import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create package (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let delivererId: string
  let recipientId: string

  beforeAll(async () => {
    // Inicializar a aplicação
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()

    // Criar um entregador válido
    const deliverer = await prisma.user.create({
      data: {
        name: 'Entregador 1',
        email: 'entregador@fast.com',
        password: '123456',
        role: 'DELIVERED_DRIVER',
      },
    })
    delivererId = deliverer.id

    // Criar um destinatário válido
    const recipient = await prisma.user.create({
      data: {
        name: 'Destinatário 1',
        email: 'destinatario@fast.com',
        password: '123456',
        role: 'RECIPIENT',
      },
    })
    recipientId = recipient.id
  })

  test('[POST] /packages', async () => {
    const response = await request(app.getHttpServer()).post('/packages').send({
      title: 'Pacote 01 Exemplo',
      content: 'Contéudo exemplo',
      status: 'delivered',
      recipientId,
      delivererId,
    })

    expect(response.statusCode).toBe(201)

    const packageOnDatabase = await prisma.package.findFirst({
      where: {
        content: 'Contéudo exemplo',
      },
    })

    expect(packageOnDatabase).toBeTruthy()
  })
})
