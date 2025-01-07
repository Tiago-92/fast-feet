import { Controller, Delete, HttpCode, Injectable, Param } from '@nestjs/common'
import { DeliveredDriverUseCase } from '@/domain/use-cases/delivered-driver'

Injectable()
@Controller('/delivered-driver/:id')
export class DeliveredDriverController {
  constructor(private deliveredDriver: DeliveredDriverUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string): Promise<void> {
    await this.deliveredDriver.execute({ id })
  }
}
