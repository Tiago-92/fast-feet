import { GetPackagesByUserIdUseCase } from '@/domain/use-cases/get-packages-by-user-id'
import { Controller, Get, HttpCode, Injectable, Param } from '@nestjs/common'

@Injectable()
@Controller('/packages/user/:id')
export class GetPackageByUserIdController {
  constructor(private getPackageUseCase: GetPackagesByUserIdUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@Param('id') recipientId: string) {
    const packages = await this.getPackageUseCase.execute({ recipientId })

    return packages
  }
}