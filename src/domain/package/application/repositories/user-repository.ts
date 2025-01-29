import { Package } from '../../enterprise/entities/package';
import { User } from '../../enterprise/entities/user'

export abstract class UserRepository {
  abstract create(user: User): Promise<void>
  abstract updatePassword(id: string, password: string): Promise<User>
  abstract getPackagesByUserId(recipientId: string): Promise<Package[]>
}