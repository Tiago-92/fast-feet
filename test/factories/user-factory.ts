import { UniqueEntityID } from '@/core/unique-entity-id'
import { User, UserProps } from '@/domain/package/enterprise/entities/user'
import { PrismaUserMapper } from '@/infra/database/mappers/prisma-user-mapper'
import { PrismaService } from '@/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { UserRole } from '@prisma/client'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  return User.create(
    {
      name: faker.person.fullName(),
      email: override.email || faker.internet.email(),
      password: override.password || faker.internet.password(),
      phone: faker.phone.number(),
      latitude: faker.location.latitude().toString(),
      longitude: faker.location.longitude().toString(),
      role: override.role || UserRole.DELIVERED_DRIVER,
      ...override,
    },
    id,
  )
}

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaUser(data: Partial<UserProps> = {}): Promise<User> {
    const userData = makeUser(data)

    const existingUser = await this.prisma.user.findUnique({
      where: { email: userData.email },
    })

    if (existingUser) {
      return User.create(
        {
          name: existingUser.name,
          email: existingUser.email,
          password: existingUser.password,
          phone: existingUser.phone,
          latitude: existingUser.latitude,
          longitude: existingUser.longitude,
          role: existingUser.role,
        },
        new UniqueEntityID(existingUser.id),
      )
    }

    const createdUser = await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(userData),
    })

    return User.create(
      {
        name: createdUser.name,
        email: createdUser.email,
        password: createdUser.password,
        phone: createdUser.phone,
        latitude: createdUser.latitude,
        longitude: createdUser.longitude,
        role: createdUser.role,
      },
      new UniqueEntityID(createdUser.id),
    )
  }
}
