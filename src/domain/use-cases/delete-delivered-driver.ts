import { Injectable } from '@nestjs/common'
import { DeliveredDriverRepository } from '../package/application/repositories/delivered-driver-repository'

interface DeleteDeliveredDriverUseCaseRequest {
  id: string
}

@Injectable()
export class DeleteDeliveredDriverUseCase {
  constructor(private deliveredDriveredRepository: DeliveredDriverRepository) {}

  async execute({ id }: DeleteDeliveredDriverUseCaseRequest): Promise<void> {
    await this.deliveredDriveredRepository.delete(id)
  }
}
