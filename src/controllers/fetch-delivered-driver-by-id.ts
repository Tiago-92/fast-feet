import { GetDeliveredDriverUserCase } from '@/domain/use-cases/get-delivered-driver'
import { Controller, Get, HttpCode, Injectable, Param } from '@nestjs/common'

@Injectable()
@Controller('/delivered-driver/fetch/:id')
export class FetchDeliveredDriverById {
  constructor(private deliveredDriver: GetDeliveredDriverUserCase) {}

  @Get()
  @HttpCode(200)
  async handle(@Param('id') userId: string) {
    const user = await this.deliveredDriver.execute({ userId })

    return user
  }
}
