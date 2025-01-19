import { GetAllPackageUseCase } from '@/domain/use-cases/get-all-packages'
import { Controller, Get, HttpCode, Injectable } from '@nestjs/common'

@Injectable()
@Controller('/all-packages')
export class GetAllPackageController {
  constructor(private getAllPackageUseCase: GetAllPackageUseCase) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const packages = await this.getAllPackageUseCase.execute()

    return packages
  }
}
