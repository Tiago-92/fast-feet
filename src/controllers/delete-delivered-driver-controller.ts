import { Controller, Delete, HttpCode, Injectable, Param } from '@nestjs/common'
import { CreateDeliveredDriverUseCase } from '@/domain/use-cases/create-delivered-driver'

Injectable()
@Controller('/delivered-driver/:id')
export class DeliveredDriverController {
  constructor(private deliveredDriver: CreateDeliveredDriverUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string): Promise<void> {
    await this.deliveredDriver.execute({ id })
  }
}
