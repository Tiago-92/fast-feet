import { Injectable } from '@nestjs/common'
import { PackageRepository } from '../package/application/repositories/package-repository'
import { PackageStatus } from '@prisma/client'

@Injectable()
export class UpdatePackageStatusUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute(id: string, status: PackageStatus) {
    const updateStatus = await this.packageRepository.updateStatus(id, status)

    return updateStatus
  }
}
