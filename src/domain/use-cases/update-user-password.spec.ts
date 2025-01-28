import { compare, hash } from 'bcryptjs'
import { UserRole } from '@prisma/client'
import { User } from '../package/enterprise/entities/user'
import { InMemoryAccountRepository } from 'test/repositories/in-memory-account-repository'

let inMemoryAccountRepository: InMemoryAccountRepository

describe('Update User Password', () => {
  beforeEach(() => {
    inMemoryAccountRepository = new InMemoryAccountRepository()
  })

  it('should be able to update user password', async () => {
    const hashedPassword = await hash('123456', 8)

    const userContent = User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: hashedPassword,
      role: UserRole.RECIPIENT,
      phone: '11XXXXX52',
      latitude: '8548484841',
      longitude: '-8848845172',
    })

    await inMemoryAccountRepository.create(userContent)

    const newPassword = '54321'
    const updatedUserPassword = await inMemoryAccountRepository.updatePassword(
      userContent.id.toString(),
      newPassword,
    )

    const isPasswordCorrect = await compare(
      newPassword,
      updatedUserPassword.password,
    )

    expect(inMemoryAccountRepository.items).toHaveLength(1)
    expect(isPasswordCorrect).toBe(true)
    expect(updatedUserPassword.getProps()).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
        role: UserRole.RECIPIENT,
        phone: '11XXXXX52',
        latitude: '8548484841',
        longitude: '-8848845172',
      }),
    )
  })
})
