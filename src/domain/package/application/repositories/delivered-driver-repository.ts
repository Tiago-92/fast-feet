import { User } from '../../enterprise/entities/user'

export abstract class DeliveredDriverRepository {
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<User | null>
}
