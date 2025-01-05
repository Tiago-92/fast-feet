/* import { Package } from '../../enterprise/entities/package'
import { PackageRepository } from '../repositories/package-repository'
import { PackageStatusEnum } from '@/domain/enums/package-status-enum'
import { UniqueEntityID } from 'src/core/unique-entity-id'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface PackageUseCaseRequest {
  delivererId: UniqueEntityID
  recipientId: UniqueEntityID
  title: string
  content: string
  status: PackageStatusEnum
}

type PackageUseCaseaseResponse = Either<
  null,
  {
    packageContent: Package
  }
>

@Injectable()
export class PackageUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute({
    delivererId,
    recipientId,
    content,
    title,
    status,
  }: PackageUseCaseRequest): Promise<PackageUseCaseaseResponse> {
    const packageContent = Package.create({
      title,
      content,
      status,
      delivererId,
      recipientId,
    })

    await this.packageRepository.create(packageContent)

    return right({
      packageContent,
    })
  }
}
 */
