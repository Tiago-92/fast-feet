import { PackageUseCase } from './package'
import { PackageStatusEnum } from '../enums/package-status-enum'
import { UniqueEntityID } from 'src/core/unique-entity-id'
import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repositoy'
import { isRight } from '@/core/either'

let inMemoryPackageRepository: InMemoryPackageRepository
let sut: PackageUseCase

describe('Create package', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()

    sut = new PackageUseCase(inMemoryPackageRepository)
  })

  it('should be able to create a package', async () => {
    const result = await sut.execute({
      deliveryDriverId: new UniqueEntityID(),
      recipientId: new UniqueEntityID(),
      createdAt: new Date(),
      title: 'Novo pacote',
      content: 'Novo pacote',
      status: PackageStatusEnum.DELIVERED,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPackageRepository.items[0]).toEqual(
      result.value?.packageContent,
    )
  })
})
