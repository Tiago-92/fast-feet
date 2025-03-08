import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { MakePackage, PackageFactory } from 'test/factories/package-factory'
import { UserFactory } from 'test/factories/user-factory'

describe('Fetch all packages by User ID (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let recipientId: string
  let userFactory: UserFactory
  let packageFactory: PackageFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [UserFactory, PackageFactory, MakePackage, PrismaService],
    }).compile()

    userFactory = moduleRef.get(UserFactory)
    packageFactory = moduleRef.get(PackageFactory)
    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()

    await prisma.package.deleteMany()
  })

  test('[GET] /packages/user/:id', async () => {
    const hashedPassword = await hash('123545', 10)
    // delivered driver
    await userFactory.makePrismaUser({
      email: 'jose@teste.com',
      password: hashedPassword,
    })

    const recipient = await userFactory.makePrismaUser({
      role: 'RECIPIENT',
    })
    recipientId = recipient.id.toString()

    await packageFactory.makePrismaPackage({
      title: 'Pacote 01',
      content: 'Pacote 1',
      recipientId,
    })

    await packageFactory.makePrismaPackage({
      title: 'Pacote 02',
      content: 'Pacote 2',
      recipientId,
    })

    const authResponse = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'jose@teste.com',
        password: '123545',
      })

    const accessToken = authResponse.body.access_token

    const response = await request(app.getHttpServer())
      .get(`/packages/user/${recipientId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body.value.packageContent).toHaveLength(2)
    /* expect(response.body.value.packages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: expect.objectContaining({
            title: 'Embalagem Teste',
            status: 'AWAITING_PICKUP',
            recipientId: expect.objectContaining({
              value: recipientId,
            }),
          }),
        }),
        expect.objectContaining({
          props: expect.objectContaining({
            title: 'Embalagem Teste 2',
            status: 'AWAITING_PICKUP',
            recipientId: expect.objectContaining({
              value: recipientId,
            }),
          }),
        }),
      ]),
    ) */
  })
})
