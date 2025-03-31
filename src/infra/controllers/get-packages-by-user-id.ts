import { GetPackagesByUserIdUseCase } from '@/domain/use-cases/get-packages-by-user-id'
import { Roles } from '@/infra/decorators/roles.decorator'
import { RolesGuard } from '@/infra/guards/roles.guard'
import {
  Controller,
  Get,
  HttpCode,
  Injectable,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('/packages/user/:id')
export class GetPackageByUserIdController {
  constructor(private getPackageUseCase: GetPackagesByUserIdUseCase) {}

  @Get()
  @Roles('DELIVERED_DRIVER')
  @HttpCode(200)
  async handle(@Param('id') delivererId: string, @Request() req) {
    const authenticatedDeliveryDriver = req.user.sub

    const packages = await this.getPackageUseCase.execute({
      delivererId,
      authenticatedDeliveryDriver,
    })

    return packages
  }
}
