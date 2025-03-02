import { GetDeliveredDriverUserCase } from '@/domain/use-cases/get-delivered-driver'
import { Roles } from '@/infra/decorators/roles.decorator'
import { RolesGuard } from '@/infra/guards/roles.guard'
import {
  Controller,
  Get,
  HttpCode,
  Injectable,
  Param,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
@Controller('/delivered-driver/fetch/:id')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class FetchDeliveredDriverById {
  constructor(private deliveredDriver: GetDeliveredDriverUserCase) {}

  @Get()
  @HttpCode(200)
  @Roles('DELIVERED_DRIVER')
  async handle(@Param('id') userId: string) {
    const user = await this.deliveredDriver.execute({ userId })

    return user
  }
}
