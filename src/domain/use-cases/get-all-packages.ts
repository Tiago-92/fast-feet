import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { PackageRepository } from '../package/application/repositories/package-repository'
import { Package } from '../package/enterprise/entities/package'

type GetPackageUseCaseResponse = Either<
  null,
  {
    packages: Package[]
  }
>

@Injectable()
export class GetAllPackageUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute(): Promise<GetPackageUseCaseResponse> {
    const packages = await this.packageRepository.findAll()

    if (!packages) {
      throw new Error('Nenhum pacote foi encontrad')
    }

    return right({
      packages,
    })
  }
}
