import { User } from '../../enterprise/entities/user'

export abstract class UserRepository {
  abstract create(user: User): Promise<void>
}
