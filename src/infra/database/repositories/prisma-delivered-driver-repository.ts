import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { DeliveredDriverRepository } from '@/domain/package/application/repositories/delivered-driver-repository'
import { User } from '@/domain/package/enterprise/entities/user'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

@Injectable()
export class PrismaDeliveredDriverRepository
  implements DeliveredDriverRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new Error('Usuário não encontrado.')
    }

    return PrismaUserMapper.toDomain(user)
  }

  async delete(id: string) {
    const user = await this.prisma.user.delete({
      where: { id },
    })

    if (!user) {
      throw new Error('Usuário não encontrado.')
    }
  }
}
