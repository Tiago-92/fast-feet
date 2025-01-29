import { InMemoryDeliveredDriverRepository } from 'test/repositories/in-memory-delivered-driver-repository'
import { User } from '../package/enterprise/entities/user'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { GetDeliveredDriverUserCase } from './get-delivered-driver'
import { UserRole } from '@prisma/client'

let inMemoryDeliveredDriverRepository: InMemoryDeliveredDriverRepository
let sut: GetDeliveredDriverUserCase

describe('Get Delivered Driver Use Case', () => {
  beforeEach(() => {
    inMemoryDeliveredDriverRepository = new InMemoryDeliveredDriverRepository()
    sut = new GetDeliveredDriverUserCase(inMemoryDeliveredDriverRepository)
  })

  it('should be able to fetch a delivered driver by ID', async () => {
    const user = User.create(
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        role: UserRole.DELIVERED_DRIVER,
        latitude: '751215668612',
        longitude: '-51515667781',
        phone: '429XXXXXX51'
      },
      new UniqueEntityID('1'),
    )

    inMemoryDeliveredDriverRepository.items.push(user)

    const result = await sut.execute({ userId: '1' })

    if (result.isRight()) {
      const { user } = result.value

      expect(user.id.toValue()).toBe('1')
      expect(user.name).toBe('John Doe')
      expect(user.email).toBe('johndoe@example.com')
      expect(user.role).toBe(UserRole.DELIVERED_DRIVER)
    }
  })
})
