import { UserRepository } from '@/domain/package/application/repositories/user-repository'
import { User } from '@/domain/package/enterprise/entities/user'
import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const PrismaUserData = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.create({
      data: PrismaUserData,
    })
  }
}
