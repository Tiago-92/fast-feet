import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PackageStatus } from '@prisma/client'

describe('Get All Package Status (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[GET] /status', async () => {
    const response = await request(app.getHttpServer()).get('/status')

    const expectedStatus = Object.values(PackageStatus)

    expect(response.status).toBe(200)
    expect(response.body.value.status).toEqual(expectedStatus)
  })
})
