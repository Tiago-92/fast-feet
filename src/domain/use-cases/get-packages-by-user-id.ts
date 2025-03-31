import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Package } from '../package/enterprise/entities/package'
import { UserRepository } from '../package/application/repositories/user-repository'
import { UniqueEntityID } from '@/core/unique-entity-id'

interface GetPackagesByUserIdUseCaseRequest {
  delivererId: string
  authenticatedDeliveryDriver?: string
}

type GetPackagesByUserIdUseCaseResponse = Either<
  null,
  {
    packages: Package[]
  }
>

@Injectable()
export class GetPackagesByUserIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    delivererId,
    authenticatedDeliveryDriver,
  }: GetPackagesByUserIdUseCaseRequest): Promise<GetPackagesByUserIdUseCaseResponse> {
    const packages =
      await this.userRepository.getPackagesByDelivererId(delivererId)

    const allMatch = packages.every((pkg) => {
      const deliveredDriverValue =
        pkg.delivererId instanceof UniqueEntityID
          ? pkg.delivererId.toString()
          : pkg.delivererId
      console.log('ID do entregador do pacote', deliveredDriverValue)

      return deliveredDriverValue === authenticatedDeliveryDriver
    })

    if (!allMatch) {
      throw new Error('Não é possível listar as encomendas de outro entregador')
    }

    /* if (!delivererId) {
      throw new Error('Entregador não encontrado.')
    } */

    return right({
      packages,
    })
  }
}
