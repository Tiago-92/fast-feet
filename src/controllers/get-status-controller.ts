import { GetStatusUseCase } from '@/domain/use-cases/get-package-status'
import { Controller, Get, HttpCode, Injectable } from '@nestjs/common'

@Injectable()
@Controller('/status')
export class GetStatusController {
  constructor(private getStatusUseCase: GetStatusUseCase) {}

  @Get()
  @HttpCode(200)
  async getStatus() {
    const status = this.getStatusUseCase.execute()

    return status
  }
}
