import { User } from '@/domain/package/enterprise/entities/user'
import { DeliveredDriverRepository } from '@/domain/package/application/repositories/delivered-driver-repository'
import { UserRole } from '@prisma/client'

export class InMemoryDeliveredDriverRepository
  implements DeliveredDriverRepository
{
  getDelivererLocation(
    delivererId: string,
  ): Promise<{ latitude: number; longitude: number } | null> {
    throw new Error('Method not implemented.')
  }

  public items: User[] = []

  async create(user: User): Promise<User> {
    this.items.push(user)

    return user
  }

  async findById(id: string): Promise<User> {
    const userFound = this.items.find((user) => user.id.toString() === id)

    if (!userFound) {
      throw new Error('O Usuário não foi encontrado')
    }

    return userFound
  }

  async update(
    id: string,
    data: { name: string; email: string; password: string; role: UserRole },
  ): Promise<User> {
    const index = this.items.findIndex((user) => user.id.toString() === id)

    if (index === -1) {
      throw new Error('O Usuário não foi encontrado')
    }

    const user = this.items[index]
    const updatedProps = {
      ...user.getProps(),
      ...data,
    }
    const updatedUser = User.create(updatedProps, user.id)

    this.items[index] = updatedUser

    return updatedUser
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((user) => user.id.toString() !== id)
  }
}
