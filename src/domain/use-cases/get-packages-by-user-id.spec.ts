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

    const package1 = Package.create(
      {
        title: 'Embalagem Teste',
        content: 'Embalagem Teste',
        status: PackageStatus.AWAITING_PICKUP,
        delivererId: 'dc8ec4s5xs5x4s5xa5cc88',
        recipientId,
        latitude: '8521574666147',
        longitude: '-12648486654',
      },
      new UniqueEntityID('1'),
    )

    const package2 = Package.create(
      {
        title: 'Embalagem Teste 2',
        content: 'Embalagem Teste 2',
        status: PackageStatus.AWAITING_PICKUP,
        delivererId: 'dc8ec4s5xs5x4s5xa5cc88',
        recipientId,
        latitude: '8878456615122',
        longitude: '-988841556565',
      },
      new UniqueEntityID('2'),
    )

    const package3 = Package.create(
      {
        title: 'Embalagem de Outro Usuário',
        content: 'Conteúdo diferente',
        status: PackageStatus.DELIVERED,
        delivererId: 'other-deliverer-id',
        recipientId: 'different-user-id',
        latitude: '123456789',
        longitude: '-987654321',
      },
      new UniqueEntityID('3'),
    )

    inMemoryAccountRepository.packages.push(package1, package2, package3)

    const result = await sut.execute({ recipientId })

    if (result.isRight()) {
        expect(result.value.packageContent).toHaveLength(2)
        expect(result.value.packageContent).toEqual(expect.arrayContaining([package1, package2]))
        expect(result.value.packageContent).not.toContain(package3)
    }
  })
})
