/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppModule } from '@/app.module'
import { PackageStatusEnum } from '@/domain/enums/package-status-enum'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PackageStatus } from '@prisma/client'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { MakePackage, PackageFactory } from 'test/factories/package-factory'
import { UserFactory } from 'test/factories/user-factory'

describe('Update Delivred Driver (E2E)', () => {
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

    await prisma.package.deleteMany()

    /* const deliverer = await prisma.user.create({
      data: {
        name: 'Entregador 1',
        email: 'entregador@fast.com',
        password: '123456',
        role: 'DELIVERED_DRIVER',
        latitude: '84d84de5d4e5d4e54dcec',
        longitude: 'dedececcd44ccececascc',
        phone: '429XXXXXX45',
      },
    })
    delivererId = deliverer.id

    const recipient = await prisma.user.create({
      data: {
        name: 'Destinatário 1',
        email: 'destinatario@fast.com',
        password: '123456',
        role: 'RECIPIENT',
        latitude: '84d84de5d4e5d4e54dcec',
        longitude: 'dedececcd44ccececascc',
        phone: '429XXXXXX45',
      },
    })
    recipientId = recipient.id

    const packageContent = await prisma.package.create({
      data: {
        title: 'Embalagem teste 1',
        content: 'Embalagem teste 1',
        status: PackageStatus.DELIVERED,
        delivererId,
        recipientId,
        latitude: 'dsdasdsdasdx8dc',
        longitude: 'defec518412scae7',
      },
    })
    packageId = packageContent.id */
  })

  test('[PUT] /package/update/:id', async () => {
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

    const packageContent = await packageFactory.makePrismaPackage({
      title: 'Pacote 01',
      content: 'Pacote 1',
    })
    packageId = packageContent.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/package/update/${packageId}`)
      .send({
        title: 'Pacote 01 atualizado',
        content: 'Pacote 01 atualizado',
      })
      .set('Authorization', `Bearer ${accessToken}`)

    const packageUpdated = await prisma.package.findFirst({
      where: {
        title: 'Pacote 01 atualizado',
        content: 'Pacote 01 atualizado',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(packageUpdated).toBeTruthy()
    expect(response.body).toEqual(
      expect.objectContaining({
        data: expect.objectContaining({
          _id: expect.objectContaining({
            value: expect.any(String),
          }),
          props: expect.objectContaining({
            title: 'Pacote 01 atualizado',
            content: 'Pacote 01 atualizado',
            createdAt: expect.any(String),
            delivererId: expect.objectContaining({
              value: expect.any(String),
            }),
            recipientId: expect.objectContaining({
              value: expect.any(String),
            }),
            latitude: expect.any(String),
            longitude: expect.any(String),
            status: 'DELIVERED',
          }),
        }),
        message: 'Status atualizado e notificação enviada!',
        notification: null,
      }),
    )
  })
})
