import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
/* import { faker } from '@faker-js/faker' */
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { MakePackage, PackageFactory } from 'test/factories/package-factory'
import { UserFactory } from 'test/factories/user-factory'

describe('Get All Packages (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userFactory: UserFactory
  let packageFactory: PackageFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [UserFactory, PackageFactory, PrismaService, MakePackage],
    }).compile()

    userFactory = moduleRef.get(UserFactory)
    packageFactory = moduleRef.get(PackageFactory)
    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()

    await prisma.package.deleteMany()
  })

  test('[GET] /all-packages should return all packages', async () => {
    const hashedPassword = await hash('123545', 10)

    await userFactory.makePrismaUser({
      email: 'jose@teste.com',
      password: hashedPassword,
    })

    await packageFactory.makePrismaPackage({
      title: 'Pacote 01',
      content: 'Pacote 1',
    })

    await packageFactory.makePrismaPackage({
      title: 'Pacote 02',
      content: 'Pacote 2',
    })

    const authResponse = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'jose@teste.com',
        password: '123545',
      })

    const accessToken = authResponse.body.access_token

    const response = await request(app.getHttpServer())
      .get('/all-packages')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body.value.packages).toHaveLength(2)
  })
})
