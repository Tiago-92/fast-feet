import { Package } from '../entities/package'
import { PackageRepository } from '../repositories/package-repository'
import { PackageStatusEnum } from '../enums/package-status-enum'
import { UniqueEntityID } from 'src/core/unique-entity-id'

interface PackageUseCaseRequest {
  deliveryDriverId: UniqueEntityID
  recipientId: UniqueEntityID
  title: string
  content: string
  status: PackageStatusEnum
  createdAt: Date
}

export class PackageUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute({
    deliveryDriverId,
    recipientId,
    content,
    title,
    status,
    createdAt,
  }: PackageUseCaseRequest) {
    const packageContent = new Package({
      title,
      content,
      status,
      deliveryDriverId,
      recipientId,
      createdAt,
    })

    await this.packageRepository.create(packageContent)

    return packageContent
  }
}
