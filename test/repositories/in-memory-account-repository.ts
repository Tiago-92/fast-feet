import { User } from '@/domain/package/enterprise/entities/user'
import { UserRepository } from '@/domain/package/application/repositories/user-repository'

export class InMemoryAccountRepository implements UserRepository {
  public items: User[] = []

  async create(user: User) {
    this.items.push(user)
  }
}
