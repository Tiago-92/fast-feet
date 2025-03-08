import { GetStatusUseCase } from '@/domain/use-cases/get-package-status'
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
@Controller('/status')
export class GetStatusController {
  constructor(private getStatusUseCase: GetStatusUseCase) {}

  @Get()
  @HttpCode(200)
  @Roles('DELIVERED_DRIVER')
  async getStatus() {
    const status = this.getStatusUseCase.execute()

    return status
  }
}
