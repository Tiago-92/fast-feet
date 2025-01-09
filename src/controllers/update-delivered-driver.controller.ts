import { UpdateDeliveredDriverUseCase } from '@/domain/use-cases/update-delivered-driver'
import {
  Controller,
  Put,
  HttpCode,
  Injectable,
  Param,
  Body,
} from '@nestjs/common'

@Injectable()
@Controller('/delivered-driver/update/:id')
export class UpdateDeliveredDriverController {
  constructor(private deliveredDriver: UpdateDeliveredDriverUseCase) {}

  @Put()
  @HttpCode(200)
  async handle(
    @Param('id') userId: string,
    @Body()
    data: { name: string; email: string; password: string; role: string },
  ) {
    const result = await this.deliveredDriver.execute(userId, data)

    return result
  }
}
