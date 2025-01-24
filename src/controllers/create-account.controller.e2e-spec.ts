/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import request from 'supertest'
import { ConfigService } from '@nestjs/config'
import { UserRole } from '@prisma/client'

describe('Create Package (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let configService: ConfigService
  let jwtService: JwtService
  let delivererId: string
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

    const user = await prisma.user.create({
      data: {
        name: 'Entregador 1',
        email: 'entregador@fast.com',
        latitude: '84d84de5d4e5d4e54dcec',
        longitude: 'dedececcd44ccececascc',
        phone: '429XXXXXX45',
        password: '123456',
        role: UserRole.DELIVERED_DRIVER,
      },
    })
    delivererId = user.id

    token = jwtService.sign({ sub: delivererId })
  })

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: { in: ['entregador@fast.com', 'johndoe@example.com'] },
      },
    })
    await app.close()
  })

  it('[POST] /accounts', async () => {
    const response = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        role: UserRole.DELIVERED_DRIVER
      })

    const userOnDatabase = await prisma.user.findFirst({
      where: {
        email: 'johndoe@example.com',
      },
    })

    expect(response.statusCode).toBe(201)
    expect(userOnDatabase).toBeTruthy()
  })
})
