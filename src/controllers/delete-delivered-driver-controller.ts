import { Controller, Delete, HttpCode, Injectable, Param } from '@nestjs/common'
import { DeleteDeliveredDriverUseCase } from '@/domain/use-cases/delete-delivered-driver'

Injectable()
@Controller('/delivered-driver/:id')
export class DeliveredDriverController {
  constructor(private deliveredDriver: DeleteDeliveredDriverUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string): Promise<void> {
    await this.deliveredDriver.execute({ id })
  }
}
