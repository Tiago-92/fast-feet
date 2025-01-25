import { UniqueEntityID } from '@/core/unique-entity-id'
import { User } from '@/domain/package/enterprise/entities/user'
import { Prisma, User as PrismaUser, UserRole } from '@prisma/client'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        role: raw.role as UserRole,
        latitude: raw.latitude,
        longitude: raw.longitude,
        phone: raw.phone,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      latitude: user.latitue,
      longitude: user.longitude,
      phone: user.phone,
    }
  }
}
