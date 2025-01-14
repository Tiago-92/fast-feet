import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { PackageRepository } from '../package/application/repositories/package-repository'
import { Package } from '../package/enterprise/entities/package'

interface GetPackageUseCaseRequest {
  packageId: string
}

type GetPackageUseCaseResponse = Either<
  null,
  {
    packageContent: Package
  }
>

@Injectable()
export class GetPackageUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute({
    packageId,
  }: GetPackageUseCaseRequest): Promise<GetPackageUseCaseResponse> {
    const packageContent = await this.packageRepository.findById(packageId)

    if (!packageContent?.id) {
      throw new Error('Esse pacote não foi encontrado.')
    }

    return right({
      packageContent,
    })
  }
}
