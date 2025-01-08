import {
  Controller,
  Delete,
  HttpCode,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { DeleteDeliveredDriverUseCase } from '@/domain/use-cases/delete-delivered-driver'
import { PrismaService } from '@/prisma/prisma.service'

Injectable()
@Controller('/delivered-driver/:id')
export class DeliveredDriverController {
  constructor(
    private deliveredDriver: DeleteDeliveredDriverUseCase,
    private prisma: PrismaService,
  ) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } })

    if (!user) {
      throw new NotFoundException('Entregador não encontrado.')
    }

    await this.deliveredDriver.execute({ id })

    return { message: 'Entregador removido com sucesso.' }
  }
}
