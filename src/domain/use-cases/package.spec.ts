/* import { PackageUseCase } from './package' */
import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repositoy'
import { PackageUseCase } from './package'
import { PackageStatus } from '@prisma/client'

let inMemoryPackageRepository: InMemoryPackageRepository
let sut: PackageUseCase

describe('Create package', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()

    sut = new PackageUseCase(inMemoryPackageRepository)
  })

  it('should be able to create a package', async () => {
    const result = await sut.execute({
      title: 'teste pacote',
      content: 'teste pacote',
      status: PackageStatus.PICKUP,
      delivererId: 'cdcefdc215ec4dvcr5vrw81ca',
      recipientId: 'de54c5ve41wudhuwefw5f4wcece',
      latitude: '1257633335744',
      longitude: '-665481558566'
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPackageRepository.items[0]).toEqual(
      result.value?.packageContent,
    )
  })
})
