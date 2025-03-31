import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { hash, compare } from 'bcryptjs'
import { UserFactory } from 'test/factories/user-factory'
import { MakePackage } from 'test/factories/package-factory'

describe('Update User Password (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userId: string
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [UserFactory, PrismaService, MakePackage],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  test('[PATCH] /password/update/:id', async () => {
    const originalPassword = '12345'
    const newPassword = '54321'

    // Criação do usuário com senha corretamente hashada
    const hashedPassword = await hash(originalPassword, 10)
    const user = await userFactory.makePrismaUser({
      email: 'jose@teste.com',
      password: hashedPassword,
    })
    userId = user.id.toString()

    // Login correto com a senha original
    const authResponse = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'jose@teste.com',
        password: originalPassword, // Corrigido para a senha correta
      })

    const accessToken = authResponse.body.access_token

    if (!accessToken) {
      throw new Error('Login falhou: Token de acesso não retornado')
    }

    // Atualização da senha com o token correto
    const response = await request(app.getHttpServer())
      .patch(`/password/update/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        password: newPassword,
      })

    expect(response.statusCode).toBe(200)

    // Verifica se a senha foi realmente atualizada
    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
    })

    expect(updatedUser).toBeTruthy()
    expect(await compare(newPassword, updatedUser!.password)).toBe(true)
  })
})
