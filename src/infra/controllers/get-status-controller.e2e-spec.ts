import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PackageStatus } from '@prisma/client'
import { UserFactory } from 'test/factories/user-factory'
import { hash } from 'bcryptjs'
import { PrismaService } from '@/prisma/prisma.service'

describe('Get All Package Status (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [UserFactory, PrismaService],
    }).compile()

    userFactory = moduleRef.get(UserFactory)
    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[GET] /status', async () => {
    const hashedPassword = await hash('123545', 10)

    await userFactory.makePrismaUser({
      email: 'jose@teste.com',
      password: hashedPassword,
    })

    const authResponse = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'jose@teste.com',
        password: '123545',
      })

    const accessToken = authResponse.body.access_token

    const response = await request(app.getHttpServer())
      .get('/status')
      .set('Authorization', `Bearer ${accessToken}`)

    const expectedStatus = Object.values(PackageStatus)

    expect(response.status).toBe(200)
    expect(response.body.value.status).toEqual(expectedStatus)
  })
})
