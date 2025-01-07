import { InMemoryDeliveredDriverRepository } from 'test/repositories/in-memory-delivered-driver-repository'
import { User } from '../package/enterprise/entities/user'
import { UserRoleEnum } from '@/domain/enums/user-role-enum'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { GetDeliveredDriverUserCase } from './get-delivered-driver'

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
        role: UserRoleEnum.DELIVERED_DRIVER,
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
      expect(user.role).toBe(UserRoleEnum.DELIVERED_DRIVER)
    }
  })
})
