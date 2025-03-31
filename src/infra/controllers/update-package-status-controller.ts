import { UpdatePackageStatusUseCase } from '@/domain/use-cases/update-package-status'
import { Roles } from '@/infra/decorators/roles.decorator'
import { RolesGuard } from '@/infra/guards/roles.guard'
import {
  Controller,
  Patch,
  HttpCode,
  Injectable,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PackageStatus } from '@prisma/client'

@Injectable()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('/status/update/:id')
export class UpdatePackageStatusController {
  constructor(private updatePackageStatusUseCase: UpdatePackageStatusUseCase) {}

  @Patch()
  @HttpCode(200)
  @Roles('DELIVERED_DRIVER')
  async handle(
    @Param('id') id: string,
    @Body('status') status: PackageStatus,
    @Request() req,
  ) {
    const authenticatedDeliveryDriver = req.user
    console.log('Usuário autenticado', authenticatedDeliveryDriver)

    const result = await this.updatePackageStatusUseCase.execute(
      id,
      status,
      authenticatedDeliveryDriver,
    )

    return result
  }
}
