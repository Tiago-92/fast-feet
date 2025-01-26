import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { DeliveredDriverRepository } from '@/domain/package/application/repositories/delivered-driver-repository'
import { User } from '@/domain/package/enterprise/entities/user'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { UserRole } from '@prisma/client'

@Injectable()
export class PrismaDeliveredDriverRepository
  implements DeliveredDriverRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new Error('Usuário não encontrado.')
    }

    // Mapeia o usuário retornado pela Prisma para a entidade User
    return PrismaUserMapper.toDomain(user)
  }

  async delete(id: string) {
    await this.prisma.user.delete({
      where: { id },
    })
  }

  async update(
    id: string,
    data: {
      name: string
      email: string
      password: string
      role: UserRole
      latitude: string
      longitude: string
    },
  ): Promise<User | null> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    })

    if (!updatedUser) {
      return null
    }
    return PrismaUserMapper.toDomain(updatedUser)
  }

  async getDelivererLocation(
    delivererId: string,
  ): Promise<{ latitude: number; longitude: number } | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: delivererId },
      select: { latitude: true, longitude: true },
    })

    if (!user || !user.latitude || !user.longitude) {
      return null
    }

    return {
      latitude: parseFloat(user.latitude),
      longitude: parseFloat(user.longitude),
    }
  }
}
