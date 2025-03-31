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
  let delivererId: string
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

    const deliveredDriver = await userFactory.makePrismaUser({
      email: 'jose@teste.com',
      password: hashedPassword,
    })
    delivererId = deliveredDriver.id.toString()

    const packageContent = await packageFactory.makePrismaPackage({
      title: 'Pacote 01',
      content: 'Pacote 1',
      status: 'AWAITING_PICKUP',
      delivererId,
    })

    await packageFactory.makePrismaPackage({
      title: 'Pacote 01',
      content: 'Pacote 1',
      status: 'AWAITING_PICKUP',
    })

    const authResponse = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'jose@teste.com',
        password: '123545',
      })

    const accessToken = authResponse.body.access_token

    const response = await request(app.getHttpServer())
      .get(`/packages/user/${packageContent.delivererId.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body.value.packages).toHaveLength(2)
  })
})
