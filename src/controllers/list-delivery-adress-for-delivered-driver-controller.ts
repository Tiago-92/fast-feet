import { Controller, Get, Injectable, Param, UseGuards } from '@nestjs/common'
import { Roles } from '@/infra/decorators/roles.decorator'
import { ListDeliveryAddressForDeliveredDriverUseCase } from '@/domain/use-cases/list-delivery-adress-for-delivered-driver'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from '@/infra/guards/roles.guard'

@Injectable()
@Controller('nearby/:delivererId')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ListDeliveryAddressForDeliveredDriverController {
  constructor(
    private listDeliveryAddressForDeliveredDriver: ListDeliveryAddressForDeliveredDriverUseCase,
  ) {}

  @Get()
  @Roles('DELIVERED_DRIVER')
  async getNearbyDeliveries(@Param('delivererId') delivererId: string) {
    const response = await this.listDeliveryAddressForDeliveredDriver.execute({
      delivererId,
    })
    return response
  }
}
