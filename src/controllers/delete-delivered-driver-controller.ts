import {
  Controller,
  Delete,
  HttpCode,
  Injectable,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common'
import { DeleteDeliveredDriverUseCase } from '@/domain/use-cases/delete-delivered-driver'
import { PrismaService } from '@/prisma/prisma.service'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from '@/infra/guards/roles.guard'
import { Roles } from '@/infra/decorators/roles.decorator'

Injectable()
@Controller('/delivered-driver/:id')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DeliveredDriverController {
  constructor(
    private deliveredDriver: DeleteDeliveredDriverUseCase,
    private prisma: PrismaService,
  ) {}

  @Delete()
  @HttpCode(204)
  @Roles('DELIVERED_DRIVER')
  async handle(@Param('id') id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } })

    if (!user) {
      throw new NotFoundException('Entregador não encontrado.')
    }

    await this.deliveredDriver.execute({ id })

    return { message: 'Entregador removido com sucesso.' }
  }
}
