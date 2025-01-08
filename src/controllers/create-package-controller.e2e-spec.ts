import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import request from 'supertest'
import { ConfigService } from '@nestjs/config'

describe('Authenticate (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let configService: ConfigService
  let jwtService: JwtService
  let delivererId: string
  let recipientId: string
  let token: string

  beforeAll(async () => {
    process.env.JWT_PRIVATE_KEY = '<sua_chave_privada_base64>'
    process.env.JWT_PUBLIC_KEY = '<sua_chave_publica_base64>'

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    configService = moduleRef.get(ConfigService)
    jwtService = moduleRef.get(JwtService)

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

    // Gerar token válido para testes
    token = jwtService.sign({ sub: delivererId })
  })

  test('[POST] /packages', async () => {
    const response = await request(app.getHttpServer())
      .post('/packages')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Pacote 01 Exemplo',
        content: 'Contéudo exemplo',
        status: 'delivered',
        recipientId,
        delivererId,
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
