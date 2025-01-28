import { User } from '@/domain/package/enterprise/entities/user'
import { UserRepository } from '@/domain/package/application/repositories/user-repository'
import { hash } from 'bcryptjs'

export class InMemoryAccountRepository implements UserRepository {
  public items: User[] = []

  async create(user: User) {
    this.items.push(user)
  }

  async updatePassword(id: string, password: string): Promise<User> {
    const userIndex = this.items.findIndex((usr) => usr.id.toString() === id)

    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`)
    }

    const currentUser = this.items[userIndex]

    const hashedPassword = await hash(password, 10)

    const updatedPackage = User.create(
      {
        name: currentUser.name,
        email: currentUser.email,
        password: hashedPassword,
        latitude: currentUser.latitue,
        longitude: currentUser.longitude,
        phone: currentUser.phone,
        role: currentUser.role,
      },
      currentUser.id,
    )

    this.items[userIndex] = updatedPackage

    return updatedPackage
  }
}
