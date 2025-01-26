import { User } from '../../enterprise/entities/user'
import { UserRole } from '@prisma/client'

export abstract class DeliveredDriverRepository {
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<User | null>
  abstract getDelivererLocation(
    delivererId: string,
  ): Promise<{ latitude: number; longitude: number } | null>

  abstract update(
    id: string,
    data: {
      name: string
      email: string
      password: string
      role: UserRole
      latitude: string
      longitude: string
    },
  ): Promise<User | null>
}
