import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { DeliveredDriverRepository } from '@/domain/package/application/repositories/delivered-driver-repository'

@Injectable()
export class PrismaDeliveredDriverRepository
  implements DeliveredDriverRepository
{
  constructor(private prisma: PrismaService) {}

  async delete(id: string) {
    const user = await this.prisma.user.delete({
      where: { id },
    })

    if (!user) {
      throw new Error('Usuário não encontrado.')
    }
  }
}
