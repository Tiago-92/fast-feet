import { Either, right } from '@/core/either'
import { DeliveredDriverRepository } from '../package/application/repositories/delivered-driver-repository'
import { User } from '../package/enterprise/entities/user'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

interface GetDeliveredDriverUserCaseRequest {
  userId: string
}

type GetDeliveredDriverUserCaseResponse = Either<
  NotAllowedError,
  {
    user: User
  }
>

@Injectable()
export class GetDeliveredDriverUserCase {
  constructor(private deliveredDriverRepository: DeliveredDriverRepository) {}

  async execute({
    userId,
  }: GetDeliveredDriverUserCaseRequest): Promise<GetDeliveredDriverUserCaseResponse> {
    const user = await this.deliveredDriverRepository.findById(userId)

    if (!user?.id) {
      throw new Error('Usuário não encontrado.')
    }

    return right({
      user,
    })
  }
}
