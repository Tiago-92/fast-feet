import { Injectable } from '@nestjs/common'
import { DeliveredDriverRepository } from '../package/application/repositories/delivered-driver-repository'

interface CreateDeliveredDriverUseCaseRequest {
  id: string
}

@Injectable()
export class CreateDeliveredDriverUseCase {
  constructor(private deliveredDriveredRepository: DeliveredDriverRepository) {}

  async execute({ id }: CreateDeliveredDriverUseCaseRequest): Promise<void> {
    await this.deliveredDriveredRepository.delete(id)
  }
}
