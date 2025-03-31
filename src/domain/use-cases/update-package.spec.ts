import { Package } from '../package/enterprise/entities/package'
import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repositoy'
import { PackageStatus } from '@prisma/client'

let inMemoryPackageRepository: InMemoryPackageRepository
describe('Update Package', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
  })

  it('should be able to update a package', async () => {
    const packageContent = Package.create({
      title: 'Embalagem teste 1',
      content: 'Embalagem teste 1',
      status: PackageStatus.RETURNED,
      delivererId: 'sded4c84w81x2c18cec8wxcd5',
      recipientId: '8fewc5wd1ce5wc1we51sd5c1',
      latitude: '887455664451',
      longitude: '-884545615575',
    })

    await inMemoryPackageRepository.create(packageContent)

    const updatedPackage = await inMemoryPackageRepository.update(
      packageContent.id.toString(),
      {
        title: 'Embalagem teste 2 atualizada',
        content: 'Embalagem teste 2 atualizaada',
        status: PackageStatus.DELIVERED,
        delivererId: 'sded4c84w81x2c18cec8wxcd5',
        recipientId: '8fewc55wd1ce5wc1we51sd5c1',
      },
    )

    expect(inMemoryPackageRepository.items).toHaveLength(1)
    expect(updatedPackage.getProps()).toEqual(
      expect.objectContaining({
        title: 'Embalagem teste 2 atualizada',
        content: 'Embalagem teste 2 atualizaada',
        status: PackageStatus.DELIVERED,
        delivererId: 'sded4c84w81x2c18cec8wxcd5',
        recipientId: '8fewc55wd1ce5wc1we51sd5c1',
      }),
    )
  })
})
