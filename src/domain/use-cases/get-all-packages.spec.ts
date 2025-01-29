import { UniqueEntityID } from '@/core/unique-entity-id'
import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repositoy'
import { Package } from '../package/enterprise/entities/package'
import { GetAllPackageUseCase } from './get-all-packages'
import { PackageStatus } from '@prisma/client'

let inMemoryPackageRepository: InMemoryPackageRepository
let sut: GetAllPackageUseCase

describe('Get Package Use Case', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    sut = new GetAllPackageUseCase(inMemoryPackageRepository)
  })

  it('should be able to list an all packages created', async () => {
    const packageContent1 = Package.create(
      {
        title: 'Embalagem 1',
        content: 'Embalagem 1',
        delivererId: 'sdfebe5cewcvhgc5ecwgdc',
        recipientId: '5dc5ewc1sdfefcece55c1',
        status: PackageStatus.AWAITING_PICKUP,
        latitude: '85878887822654',
        longitude: '-8552314458756'
      },
      new UniqueEntityID('xhey515ec48e54e8'),
    )

    const packageContent2 = Package.create(
      {
        title: 'Embalagem 2',
        content: 'Embalagem 2',
        delivererId: 'sdfebe5cewcvhgc5ecwgdc',
        recipientId: '5dc5ewc1sdfefcece55c1',
        status: PackageStatus.AWAITING_PICKUP,
        latitude: '326658741755',
        longitude: '-69987841133'
      },
      new UniqueEntityID('cdcd5ce8c5czce'),
    )

    inMemoryPackageRepository.items.push(packageContent1)
    inMemoryPackageRepository.items.push(packageContent2)

    const result = await sut.execute()

    if (result.isRight()) {
      const { packages } = result.value
      expect(inMemoryPackageRepository.items).toHaveLength(2)
      expect(packages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ title: 'Embalagem 1' }),
          expect.objectContaining({ title: 'Embalagem 2' }),
        ]),
      )
    }
  })
})
