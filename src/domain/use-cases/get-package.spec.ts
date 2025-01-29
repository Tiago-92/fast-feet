import { UniqueEntityID } from '@/core/unique-entity-id'
import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repositoy'
import { GetPackageUseCase } from './get-package'
import { Package } from '../package/enterprise/entities/package'
import { PackageStatus } from '@prisma/client'

let inMemoryPackageRepository: InMemoryPackageRepository
let sut: GetPackageUseCase

describe('Get Package Use Case', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    sut = new GetPackageUseCase(inMemoryPackageRepository)
  })

  it('should be able to fetch a package by ID', async () => {
    const packageContent = Package.create(
      {
        title: 'Embalagem 1',
        content: 'Embalagem 1',
        delivererId: 'sdfebe5cewcvhgc5ecwgdc',
        recipientId: '5dc5ewc1sdfefcece55c1',
        status: PackageStatus.PICKUP,
      },
      new UniqueEntityID('xhey515ec48e54e8'),
    )

    inMemoryPackageRepository.items.push(packageContent)

    const result = await sut.execute({ packageId: 'xhey515ec48e54e8' })

    if (result.isRight()) {
      const { packageContent } = result.value

      expect(packageContent.id.toValue()).toBe('xhey515ec48e54e8')
      expect(packageContent.title).toBe('Embalagem 1')
      expect(packageContent.content).toBe('Embalagem 1')
      expect(packageContent.status).toBe(PackageStatus.PICKUP)
    }
  })
})
