import { Package } from '../package/enterprise/entities/package'
import { PackageRepository } from '../package/application/repositories/package-repository'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { PackageStatus } from '@prisma/client'

interface PackageUseCaseRequest {
  delivererId: string
  recipientId: string
  title: string
  content: string
  status: PackageStatus
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
