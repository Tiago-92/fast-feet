import { PackageStatusEnum } from '@/domain/enums/package-status-enum'
import { UpdatePackeUseCase } from '@/domain/use-cases/update-package'
import {
  Controller,
  Put,
  HttpCode,
  Injectable,
  Param,
  Body,
} from '@nestjs/common'

@Injectable()
@Controller('/package/update/:id')
export class UpdatePackageController {
  constructor(private updatePackageUseCase: UpdatePackeUseCase) {}

  @Put()
  @HttpCode(200)
  async handle(
    @Param('id') userId: string,
    @Body()
    data: { title: string; content: string; status: PackageStatusEnum },
  ) {
    const result = await this.updatePackageUseCase.execute(userId, data)

    return result
  }
}
