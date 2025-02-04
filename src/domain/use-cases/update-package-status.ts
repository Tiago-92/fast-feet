import { Injectable } from '@nestjs/common'
import { PackageRepository } from '../package/application/repositories/package-repository'
import { PackageStatus } from '@prisma/client'
import { NotifyRecipientUseCase } from './notify-recipeint'

@Injectable()
export class UpdatePackageStatusUseCase {
    constructor(
        private packageRepository: PackageRepository,
        private notifyRecipient: NotifyRecipientUseCase
    ) {}

    async execute(id: string, status: PackageStatus) {
        const updateStatus = await this.packageRepository.updateStatus(id, status)

        if (!updateStatus?.recipientId) {
            throw new Error('Destinatário não encontrado para a encomenda')
        }

        const notification = await this.notifyRecipient.execute({
            recipientId: updateStatus.recipientId.toString(),
            status
        })

        return { updateStatus, notification }
    }
}
