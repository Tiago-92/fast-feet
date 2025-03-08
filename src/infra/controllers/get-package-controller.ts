import { GetPackageUseCase } from '@/domain/use-cases/get-package'
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
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('/package/fetch/:id')
export class GetPackageController {
  constructor(private getPackageUseCase: GetPackageUseCase) {}

  @Get()
  @Roles('DELIVERED_DRIVER')
  @HttpCode(200)
  async handle(@Param('id') packageId: string) {
    const user = await this.getPackageUseCase.execute({ packageId })

    return user
  }
}
