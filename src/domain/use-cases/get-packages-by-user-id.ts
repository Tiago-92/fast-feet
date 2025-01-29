import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Package } from '../package/enterprise/entities/package'
import { UserRepository } from '../package/application/repositories/user-repository'

interface GetPackagesByUserIdUseCaseRequest {
  recipientId: string
}

type GetPackagesByUserIdUseCaseResponse = Either<
  null,
  {
    packageContent: Package[]
  }
>

@Injectable()
export class GetPackagesByUserIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    recipientId,
  }: GetPackagesByUserIdUseCaseRequest): Promise<GetPackagesByUserIdUseCaseResponse> {
    const packageContent = await this.userRepository.getPackagesByUserId(recipientId)

    if (!recipientId) {
      throw new Error('Usuário não encontrado.')
    }

    return right({
        packageContent,
    })
  }
}
