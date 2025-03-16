import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { UserFactory } from 'test/factories/user-factory'
import { PrismaService } from '@/prisma/prisma.service'
import { hash } from 'bcryptjs'
import { MakePackage, PackageFactory } from 'test/factories/package-factory'
import { PackageStatus } from '@prisma/client'

describe('Upload Package Image', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let packageFactory: PackageFactory
  let packageId: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService, UserFactory, PackageFactory, MakePackage],
    }).compile()

    app = moduleRef.createNestApplication()
    userFactory = moduleRef.get(UserFactory)
    packageFactory = moduleRef.get(PackageFactory)

    await app.init()
  })

  test('[POST] /package/image', async () => {
    const hashedPassword = await hash('123545', 10)

    await userFactory.makePrismaUser({
      email: 'jose@teste.com',
      password: hashedPassword,
    })

    const packageContent = await packageFactory.makePrismaPackage({
      title: 'Pacote 01',
      content: 'Pacote 1',
      status: PackageStatus.AWAITING_PICKUP,
    })
    packageId = packageContent.id.toString()

    const authResponse = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'jose@teste.com',
        password: '123545',
      })

    const accessToken = authResponse.body.access_token

    const response = await request(app.getHttpServer())
      .post(`/package/image/${packageId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', './test/e2e/sample-upload.jpg')

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      packagePhotoId: expect.any(String),
    })
  })
})
