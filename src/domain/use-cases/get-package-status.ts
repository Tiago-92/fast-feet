import { Injectable } from '@nestjs/common'
import { PackageRepository } from '../package/application/repositories/package-repository'
import { right } from '@/core/either'

@Injectable()
export class GetStatusUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute() {
    const status = await this.packageRepository.getStatus()

    return right({
      status,
    })
  }
}
