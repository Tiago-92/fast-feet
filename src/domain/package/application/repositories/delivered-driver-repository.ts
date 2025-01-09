import { User } from '../../enterprise/entities/user'

export abstract class DeliveredDriverRepository {
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<User | null>
  abstract update(
    id: string,
    data: { name: string; email: string; password: string; role: string },
  ): Promise<{
    id: string
    name: string
    email: string
    password: string
    role: string
  }>
}
