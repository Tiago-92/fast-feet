import { InMemoryDeliveredDriverRepository } from 'test/repositories/in-memory-delivered-driver-repository'
import { DeleteDeliveredDriverUseCase } from './delete-delivered-driver'
import { User } from '../package/enterprise/entities/user'
import { UserRoleEnum } from '../enums/user-role-enum'
import { UniqueEntityID } from '@/core/unique-entity-id'

let inMemoryDeliveredDriverRepository: InMemoryDeliveredDriverRepository
let sut: DeleteDeliveredDriverUseCase

describe('Register User', () => {
  beforeEach(() => {
    inMemoryDeliveredDriverRepository = new InMemoryDeliveredDriverRepository()
    sut = new DeleteDeliveredDriverUseCase(inMemoryDeliveredDriverRepository)
  })

  it('should be able to delete a delivered driver', async () => {
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

    await sut.execute({ id: '1' })

    expect(inMemoryDeliveredDriverRepository.items).toHaveLength(0)
  })
})
