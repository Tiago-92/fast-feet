import { UpdateDeliveredDriverUseCase } from '@/domain/use-cases/update-delivered-driver'
import { Roles } from '@/infra/decorators/roles.decorator'
import { RolesGuard } from '@/infra/guards/roles.guard'
import {
  Controller,
  Put,
  HttpCode,
  Injectable,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserRole } from '@prisma/client'

@Injectable()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('/delivered-driver/update/:id')
export class UpdateDeliveredDriverController {
  constructor(private deliveredDriver: UpdateDeliveredDriverUseCase) {}

  @Put()
  @Roles('DELIVERED_DRIVER')
  @HttpCode(200)
  async handle(
    @Param('id') userId: string,
    @Body()
    data: {
      name: string
      email: string
      password: string
      role: UserRole
      latitude: string
      longitude: string
      phone: string
    },
  ) {
    const result = await this.deliveredDriver.execute(userId, data)

    return result
  }
}
