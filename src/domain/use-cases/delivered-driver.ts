import { Injectable } from '@nestjs/common'
import { DeliveredDriverRepository } from '../package/application/repositories/delivered-driver-repository'

interface DeliveredDriverUseCaseRequest {
  id: string
}

@Injectable()
export class DeliveredDriverUseCase {
  constructor(private deliveredDriveredRepository: DeliveredDriverRepository) {}

  async execute({ id }: DeliveredDriverUseCaseRequest): Promise<void> {
    await this.deliveredDriveredRepository.delete(id)
  }
}
