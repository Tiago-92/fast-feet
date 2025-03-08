import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { hash, compare } from 'bcryptjs'

describe('Update User Password (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userId: string
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()

    const hashedPassword = await hash('123456', 10)

    const user = await prisma.user.create({
      data: {
        name: 'Entregador 1',
        email: 'entregador@fast.com',
        password: hashedPassword,
        role: 'DELIVERED_DRIVER',
        latitude: '84d84de5d4e5d4e54dcec',
        longitude: 'dedececcd44ccececascc',
        phone: '429XXXXXX45',
      },
    })
    userId = user.id
  })

  test('[PATCH] /password/update/:id', async () => {
    const newPassword = '654321'

    const response = await request(app.getHttpServer())
      .patch(`/password/update/${userId}`)
      .send({
        password: newPassword,
      })

    expect(response.statusCode).toBe(200)

    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
    })

    expect(response.statusCode).toBe(200)
    expect(updatedUser).toBeTruthy()
    expect(await compare(newPassword, updatedUser!.password)).toBe(true)
  })
})
