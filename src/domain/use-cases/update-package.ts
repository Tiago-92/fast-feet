import { Injectable } from '@nestjs/common'
import { PackageRepository } from '../package/application/repositories/package-repository'
import { PackageStatusEnum } from '../enums/package-status-enum'

@Injectable()
export class UpdatePackeUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute(
    id: string,
    data: {
      title: string
      content: string
      status: PackageStatusEnum
      recipientId: string
      delivererId: string
    },
  ) {
    const updatedPackage = await this.packageRepository.update(id, data)

    return updatedPackage
  }
}
