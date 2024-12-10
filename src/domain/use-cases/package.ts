import { Package } from '../entities/package'
import { PackageRepository } from '../repositories/package-repository'
import { PackageStatusEnum } from '../enums/package-status-enum'
import { UniqueEntityID } from 'src/core/unique-entity-id'
import { Either, right } from '@/core/either'

interface PackageUseCaseRequest {
  deliveryDriverId: UniqueEntityID
  recipientId: UniqueEntityID
  title: string
  content: string
  status: PackageStatusEnum
  createdAt: Date
}

type PackageUseCaseaseResponse = Either<
  null,
  {
    packageContent: Package
  }
>

export class PackageUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute({
    deliveryDriverId,
    recipientId,
    content,
    title,
    status,
    createdAt,
  }: PackageUseCaseRequest): Promise<PackageUseCaseaseResponse> {
    const packageContent = new Package({
      title,
      content,
      status,
      deliveryDriverId,
      recipientId,
      createdAt,
    })

    await this.packageRepository.create(packageContent)

    return right({
      packageContent,
    })
  }
}
