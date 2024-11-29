import { Package } from "../entities/package"
import { PackageStatusEnum } from "../value-objects/package-status-enum"

interface PackageUseCaseRequest {
  deliveryDriverId: string
  recipientId: string
  title: string
  content: string
  status: PackageStatusEnum
}

export class PackageUseCase {
  execute({ deliveryDriverId, recipientId, content, title, status }: PackageUseCaseRequest) {

    const packageContent = new Package({
      title,
      content,
      status,
      deliveryDriverId,
      recipientId
    })

    return packageContent
  }
}