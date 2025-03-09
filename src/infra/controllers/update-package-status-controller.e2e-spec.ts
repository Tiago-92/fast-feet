import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PackageStatus } from '@prisma/client'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { MakePackage, PackageFactory } from 'test/factories/package-factory'
import { UserFactory } from 'test/factories/user-factory'

describe('Update Package Status (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let packageId: string
  let userFactory: UserFactory
  let packageFactory: PackageFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [UserFactory, PackageFactory, PrismaService, MakePackage],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    packageFactory = moduleRef.get(PackageFactory)

    await app.init()
  })

  test('[PATCH] /status/update/:id', async () => {
    const hashedPassword = await hash('123545', 10)

    await userFactory.makePrismaUser({
      email: 'jose@teste.com',
      password: hashedPassword,
    })

    const packageContent = await packageFactory.makePrismaPackage({
      title: 'Pacote 02',
      content: 'Pacote 2',
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
      .patch(`/status/update/${packageId}`)
      .send({
        status: 'RETURNED',
      })
      .set('Authorization', `Bearer ${accessToken}`)

    const statusUpdated = await prisma.package.findFirst({
      where: {
        status: 'RETURNED',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(statusUpdated).toBeTruthy()
    /* expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.objectContaining({
          value: expect.any(String),
        }),
        props: expect.objectContaining({
          status: 'RETURNED',
        }),
      }),
    ) */
  })
})
