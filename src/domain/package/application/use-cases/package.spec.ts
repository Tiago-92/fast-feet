/* import { PackageUseCase } from './package' */
import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repositoy'
import { makePackage } from 'test/factories/make-packge'

let inMemoryPackageRepository: InMemoryPackageRepository
/* let sut: PackageUseCase */

describe('Create package', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()

    /* sut = new PackageUseCase(inMemoryPackageRepository) */
  })

  it('should be able to create a package', async () => {
    const newPackage = makePackage()
    await inMemoryPackageRepository.create(newPackage)

    expect(newPackage.id).toBeTruthy()
    expect(inMemoryPackageRepository.items[0].content).toEqual(
      newPackage.content,
    )
  })
})
