import { UpdatePackageStatusUseCase } from '@/domain/use-cases/update-package-status'
import {
  Controller,
  Patch,
  HttpCode,
  Injectable,
  Param,
  Body,
} from '@nestjs/common'
import { PackageStatus } from '@prisma/client'

@Injectable()
@Controller('/status/update/:id')
export class UpdatePackageStatusController {
  constructor(private updatePackageStatusUseCase: UpdatePackageStatusUseCase) {}

  @Patch()
  @HttpCode(200)
  async handle(@Param('id') id: string, @Body('status') status: PackageStatus) {
    const result = await this.updatePackageStatusUseCase.execute(id, status)

    return result
  }
}
