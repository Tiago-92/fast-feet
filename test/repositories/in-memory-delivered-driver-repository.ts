import { User } from '@/domain/package/enterprise/entities/user'
import { DeliveredDriverRepository } from '@/domain/package/application/repositories/delivered-driver-repository'

export class InMemoryDeliveredDriverRepository
  implements DeliveredDriverRepository
{
  public items: User[] = []

  async findById(id: string): Promise<User> {
    const userFound = this.items.find((user) => user.id.toString() === id)

    if (!userFound) {
      throw new Error('O Usuário não foi encontrado')
    }

    return userFound
  }

  async delete(id: string) {
    this.items = this.items.filter((user) => user.id.toString() !== id)
  }
}
