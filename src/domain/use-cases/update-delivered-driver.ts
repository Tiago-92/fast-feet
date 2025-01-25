import { UserRole } from '@prisma/client'
import { DeliveredDriverRepository } from '../package/application/repositories/delivered-driver-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UpdateDeliveredDriverUseCase {
  constructor(private deliveredDriverRepository: DeliveredDriverRepository) {}

  async execute(
    id: string,
    data: {
      name: string
      email: string
      password: string
      role: UserRole
      latitude: string
      longitude: string
    },
  ) {
    const updatedUser = await this.deliveredDriverRepository.update(id, data)

    return updatedUser
  }
}
