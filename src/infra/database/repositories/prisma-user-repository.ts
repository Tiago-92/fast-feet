import { UserRepository } from '@/domain/package/application/repositories/user-repository'
import { User } from '@/domain/package/enterprise/entities/user'
import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { Package } from '@/domain/package/enterprise/entities/package'
import { PrismaPackageMapper } from '../mappers/prisma-package-mapper'

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

  async updatePassword(id: string, password: string): Promise<User> {
    const updatedPassword = await this.prisma.user.update({
      where: { id },
      data: { password },
    })

    return PrismaUserMapper.toDomain(updatedPassword)
  }

  async getPackagesByUserId(recipientId: string): Promise<Package[]> {
    const packageContent = await this.prisma.package.findMany({
      where: { recipientId },
    }) 

    return packageContent.map(PrismaPackageMapper.toDomain)
  }
}
