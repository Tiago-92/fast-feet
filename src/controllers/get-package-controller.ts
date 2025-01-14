import { GetPackageUseCase } from '@/domain/use-cases/get-package'
import { Controller, Get, HttpCode, Injectable, Param } from '@nestjs/common'

@Injectable()
@Controller('/package/fetch/:id')
export class GetPackageController {
  constructor(private getPackageUseCase: GetPackageUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@Param('id') packageId: string) {
    const user = await this.getPackageUseCase.execute({ packageId })

    return user
  }
}
