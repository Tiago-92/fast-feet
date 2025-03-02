import { UpdatePackeUseCase } from '@/domain/use-cases/update-package'
import {
  NotifyRecipientUseCase,
  NotificationResponse,
} from '@/domain/use-cases/notify-recipeint'
import {
  Controller,
  Put,
  HttpCode,
  Injectable,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common'
import { PackageStatus } from '@prisma/client'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from '@/infra/guards/roles.guard'
import { Roles } from '@/infra/decorators/roles.decorator'

@Injectable()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('/package/update/:id')
export class UpdatePackageController {
  constructor(
    private updatePackageUseCase: UpdatePackeUseCase,
    private notifyRecipientUseCase: NotifyRecipientUseCase,
  ) {}

  @Put()
  @Roles('DELIVERED_DRIVER')
  @HttpCode(200)
  async handle(
    @Param('id') packageId: string,
    @Body()
    data: {
      title: string
      content: string
      status: PackageStatus
      delivererId: string
      recipientId: string
    },
  ) {
    const updatedPackage = await this.updatePackageUseCase.execute(
      packageId,
      data,
    )

    let notificationMessage: string | null = null

    if (data.status) {
      const notificationResponse: NotificationResponse =
        await this.notifyRecipientUseCase.execute({
          recipientId: data.recipientId,
          status: data.status,
        })

      notificationMessage = notificationResponse.message
    }

    return {
      message: 'Status atualizado e notificação enviada!',
      data: updatedPackage,
      notification: notificationMessage,
    }
  }
}
