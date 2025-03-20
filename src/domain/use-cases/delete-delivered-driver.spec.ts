import { InMemoryDeliveredDriverRepository } from 'test/repositories/in-memory-delivered-driver-repository'
import { DeleteDeliveredDriverUseCase } from './delete-delivered-driver'
import { User } from '../package/enterprise/entities/user'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { UserRole } from '@prisma/client'

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
        role: UserRole.DELIVERED_DRIVER,
        latitude: '5545484212178',
        longitude: '-884848484848',
        phone: '819XXXX745',
      },
      new UniqueEntityID('1'),
    )

    inMemoryDeliveredDriverRepository.items.push(user)

    await sut.execute({ id: '1' })

    expect(inMemoryDeliveredDriverRepository.items).toHaveLength(0)
  })
})
