import { UniqueEntityID } from '@/core/unique-entity-id'
import { PackageStatus } from '@prisma/client'
import { GetPackagesByUserIdUseCase } from './get-packages-by-user-id'
import { InMemoryAccountRepository } from 'test/repositories/in-memory-account-repository'
import { Package } from '../package/enterprise/entities/package'

let inMemoryAccountRepository: InMemoryAccountRepository
let sut: GetPackagesByUserIdUseCase

describe('Get Packages By User ID Use Case', () => {
  beforeEach(() => {
    inMemoryAccountRepository = new InMemoryAccountRepository()
    sut = new GetPackagesByUserIdUseCase(inMemoryAccountRepository)
  })

  it('should be able to fetch all packages by user ID', async () => {
    const recipientId = '8c4e8ecweqqzzqw8z2SSDCAS'
    const authenticatedDeliveryDriver = '84sc48cwtxfstycfasytxfYUXGQWYIC5C'
    const delivererId = '84sc48cwtxfstycfasytxfYUXGQWYIC5C'

    const package1 = Package.create(
      {
        title: 'Embalagem Teste',
        content: 'Embalagem Teste',
        status: PackageStatus.AWAITING_PICKUP,
        delivererId,
        latitude: '8521574666147',
        longitude: '-12648486654',
        recipientId,
      },
      new UniqueEntityID('2'),
    )

    const package2 = Package.create(
      {
        title: 'Embalagem de Outro Usuário',
        content: 'Conteúdo diferente',
        status: PackageStatus.DELIVERED,
        delivererId,
        recipientId,
        latitude: '123456789',
        longitude: '-987654321',
      },
      new UniqueEntityID('3'),
    )

    inMemoryAccountRepository.packages.push(package1, package2)

    const result = await sut.execute({
      delivererId,
      authenticatedDeliveryDriver,
    })

    if (result.isRight()) {
      expect(result.value.packages).toHaveLength(2)
      expect(result.value.packages).toEqual(
        expect.arrayContaining([package1, package2]),
      )
    }
  })
})
