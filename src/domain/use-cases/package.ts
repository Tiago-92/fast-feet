import { Package } from "../entities/package"
import { PackageRepository } from "../repositories/package-repository"
import { PackageStatusEnum } from "../enums/package-status-enum"

interface PackageUseCaseRequest {
  deliveryDriverId: string
  recipientId: string
  title: string
  content: string
  status: PackageStatusEnum
}

export class PackageUseCase {
  constructor(
    private packageRepository: PackageRepository
  ) { }

  async execute({ deliveryDriverId, recipientId, content, title, status }: PackageUseCaseRequest) {
    const packageContent = new Package({
      title,
      content,
      status,
      deliveryDriverId,
      recipientId
    })

    await this.packageRepository.create(packageContent)

    return packageContent
  }
}