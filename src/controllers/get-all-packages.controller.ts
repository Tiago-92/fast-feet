import { GetAllPackageUseCase } from '@/domain/use-cases/get-all-packages'
import { Roles } from '@/infra/decorators/roles.decorator'
import { RolesGuard } from '@/infra/guards/roles.guard'
import {
  Controller,
  Get,
  HttpCode,
  Injectable,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('/all-packages')
export class GetAllPackageController {
  constructor(private getAllPackageUseCase: GetAllPackageUseCase) {}

  @Get()
  @Roles('DELIVERED_DRIVER')
  @HttpCode(200)
  async handle() {
    const packages = await this.getAllPackageUseCase.execute()

    return packages
  }
}
