import { Injectable } from '@nestjs/common'
import { PackageStatus } from '@prisma/client'

interface NotifyRecipientRequest {
    recipientId: string
    status: PackageStatus
}

export interface NotificationResponse {
    message: string
    recipientId: string
}

@Injectable()
export class NotifyRecipientUseCase {
    async execute({ recipientId, status }: NotifyRecipientRequest): Promise<NotificationResponse> {
        const statusMessages: Record<PackageStatus, string> = {
            [PackageStatus.AWAITING_PICKUP]: 'AGUARDANDO COLETA',
            [PackageStatus.DELIVERED]: 'ENTREGUE',
            [PackageStatus.PICKUP]: 'COLETANDO NO CENTRO DE DISTRIBUIÇÃO',
            [PackageStatus.RETURNED]: 'DEVOLVIDO',
        }

        const statusPackage = statusMessages[status] ?? 'STATUS DESCONHECIDO'
        const message = `O status da sua encomenda foi alterado para ${statusPackage}`

        return { recipientId, message }
    }
}