import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DeliveredDriverFactory } from 'test/factories/user-factory'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/prisma/prisma.service'

describe('Upload Package Image', () => {
  let app: INestApplication
  let deliveredDriverFactory: DeliveredDriverFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService, DeliveredDriverFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    deliveredDriverFactory = moduleRef.get(DeliveredDriverFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /package/image', async () => {
    const user = await deliveredDriverFactory.makePrismaDeliveredDriver()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/package/image')
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', './test/e2e/sample-upload.jpg')

    expect(response.statusCode).toBe(201)
  })
})
