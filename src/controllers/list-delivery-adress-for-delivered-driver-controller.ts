import { Controller, Get, Injectable, Param } from '@nestjs/common'
import { ListDeliveryAddressForDeliveredDriverUseCase } from '@/domain/use-cases/list-delivery-adress-for-delivered-driver'

@Injectable()
@Controller('nearby/:delivererId')
export class ListDeliveryAddressForDeliveredDriverController {
  constructor(
    private listDeliveryAddressForDeliveredDriver: ListDeliveryAddressForDeliveredDriverUseCase,
  ) {}

  @Get()
  async getNearbyDeliveries(@Param('delivererId') delivererId: string) {
    const response = await this.listDeliveryAddressForDeliveredDriver.execute({
      delivererId,
    })
    return response
  }
}
