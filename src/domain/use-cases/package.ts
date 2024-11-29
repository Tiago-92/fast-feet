import { Package } from "../entities/package"
import { PackageStatusEnum } from "../value-objects/package-stauts-enum"

interface PackageUseCaseRequest {
  deliveryDriverId: string
  recipientId: string
  packageId: string
  title: string
  content: string
  status: PackageStatusEnum
}

export class PackageUseCase {
  execute({ deliveryDriverId, recipientId, packageId, content, title, status }: PackageUseCaseRequest) {

    const packageContent = new Package(title, content, status)

    return packageContent
  }
}