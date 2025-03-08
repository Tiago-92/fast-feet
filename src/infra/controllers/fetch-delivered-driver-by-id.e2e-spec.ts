import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { UserFactory } from 'test/factories/user-factory'

describe('Fetch Delivered Driver by ID (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let delivererId: string
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [UserFactory, PrismaService],
    }).compile()

    userFactory = moduleRef.get(UserFactory)
    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()

    await prisma.user.deleteMany()
  })

  test('[GET] /delivered-driver/fetch/:id - Should fetch delivered driver successfully', async () => {
    const hashedPassword = await hash('123545', 10)
    const deliveredDriver = await userFactory.makePrismaUser({
      name: 'Jose Teste',
      email: 'jose@teste.com',
      password: hashedPassword,
    })
    delivererId = deliveredDriver.id.toString()

    const authResponse = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'jose@teste.com',
        password: '123545',
      })
    const accessToken = authResponse.body.access_token

    const response = await request(app.getHttpServer())
      .get(`/delivered-driver/fetch/${delivererId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      value: {
        user: {
          props: {
            name: 'Jose Teste',
            email: 'jose@teste.com',
            role: 'DELIVERED_DRIVER',
          },
        },
      },
    })
  })
})
