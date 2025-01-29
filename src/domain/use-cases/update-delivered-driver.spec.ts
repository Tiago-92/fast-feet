import { InMemoryDeliveredDriverRepository } from 'test/repositories/in-memory-delivered-driver-repository'
import { User } from '@/domain/package/enterprise/entities/user'
import { UserRoleEnum } from '@/domain/enums/user-role-enum'
import { UserRole } from '@prisma/client'

let inMemoryDeliveredDriverRepository: InMemoryDeliveredDriverRepository

describe('Update Delivered Driver', () => {
  beforeEach(() => {
    inMemoryDeliveredDriverRepository = new InMemoryDeliveredDriverRepository()
  })

  it('should be able to update a delivered driver', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: UserRole.DELIVERED_DRIVER,
      latitude: '99787566654',
      longitude: '-88784545662',
      phone: '42XXXXXXX85'
    })

    await inMemoryDeliveredDriverRepository.create(user)

    const updatedUser = await inMemoryDeliveredDriverRepository.update(
      user.id.toString(),
      {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        password: '654321',
        role: UserRoleEnum.RECIPIENT,
      },
    )

    expect(inMemoryDeliveredDriverRepository.items).toHaveLength(1)
    expect(updatedUser.getProps()).toEqual(
      expect.objectContaining({
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        password: '654321',
        role: UserRoleEnum.RECIPIENT,
      }),
    )
  })
})
