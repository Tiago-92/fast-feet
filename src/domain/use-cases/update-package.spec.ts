import { Package } from '../package/enterprise/entities/package'
import { PackageStatusEnum } from '../enums/package-status-enum'
import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repositoy'

let inMemoryPackageRepository: InMemoryPackageRepository
describe('Update Package', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
  })

  it('should be able to update a package', async () => {
    const packageContent = Package.create({
      title: 'Embalagem teste 1',
      content: 'Embalagem teste 1',
      status: PackageStatusEnum.RETURNED,
      delivererId: 'sded4c84w81x2c18cec8wxcd5',
      recipientId: '8fewc55wd1ce5wc1we51sd5c1',
    })

    await inMemoryPackageRepository.create(packageContent)

    const updatedPackage = await inMemoryPackageRepository.update(
      packageContent.id.toString(),
      {
        title: 'Embalagem teste 2 atualizada',
        content: 'Embalagem teste 2 atualizaada',
        status: PackageStatusEnum.DELIVERED,
        delivererId: 'sded4c84w81x2c18cec8wxcd5',
        recipientId: '8fewc55wd1ce5wc1we51sd5c1',
      },
    )

    expect(inMemoryPackageRepository.items).toHaveLength(1)
    expect(updatedPackage.getProps()).toEqual(
      expect.objectContaining({
        title: 'Embalagem teste 2 atualizada',
        content: 'Embalagem teste 2 atualizaada',
        status: PackageStatusEnum.DELIVERED,
        delivererId: 'sded4c84w81x2c18cec8wxcd5',
        recipientId: '8fewc55wd1ce5wc1we51sd5c1',
      }),
    )
  })
})
