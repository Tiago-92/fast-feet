import { Injectable } from '@nestjs/common'
import { PackageRepository } from '../package/application/repositories/package-repository'
import { PackageStatus } from '@prisma/client'
import { NotifyRecipientUseCase } from './notify-recipeint'
import { PackagePhotoRepository } from '../package/application/repositories/package-photo-repository'

@Injectable()
export class UpdatePackageStatusUseCase {
  constructor(
    private packageRepository: PackageRepository,
    private notifyRecipient: NotifyRecipientUseCase,
    private packagePhotoRepository: PackagePhotoRepository,
  ) {}

  async execute(
    id: string,
    status: PackageStatus,
    authenticatedDeliveryDriver: string,
  ) {
    const packageData = await this.packageRepository.findById(id)

    if (status === 'DELIVERED') {
      const hasPhoto = await this.packagePhotoRepository.findByPackageId(id)

      if (!hasPhoto) {
        throw new Error(
          'É obrigatório enviar uma foto antes de marcar como entregue',
        )
      }
    }

    if (packageData?.delivererId !== authenticatedDeliveryDriver) {
      throw new Error(
        'Apenas o entregador responsável pode marcar como entregue',
      )
    }

    const updateStatus = await this.packageRepository.updateStatus(id, status)

    if (!updateStatus?.recipientId) {
      throw new Error('Destinatário não encontrado para a encomenda')
    }

    const notification = await this.notifyRecipient.execute({
      recipientId: updateStatus.recipientId.toString(),
      status,
    })

    return { updateStatus, notification }
  }
}
