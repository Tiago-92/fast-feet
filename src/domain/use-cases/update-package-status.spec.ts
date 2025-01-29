import { Package } from '../package/enterprise/entities/package'
import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repositoy'
import { PackageStatus } from '@prisma/client'

let inMemoryPackageRepository: InMemoryPackageRepository
describe('Update Package Status', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
  })

  it('should be able to update a package status', async () => {
    const packageContent = Package.create({
      title: 'Embalagem teste 1',
      content: 'Embalagem teste 1',
      status: PackageStatus.AWAITING_PICKUP,
      delivererId: 'sded4c84w81x2c18cec8wxcd5',
      recipientId: '8fewc55wd1ce5wc1we51sd5c1',
      latitude: '8455266655',
      longitude: '-8851516635',
    })

    await inMemoryPackageRepository.create(packageContent)

    const updatedPackageStatus = await inMemoryPackageRepository.updateStatus(packageContent.id.toString(), 'PICKUP')

    expect(inMemoryPackageRepository.items).toHaveLength(1)
    expect(updatedPackageStatus.getProps()).toEqual(
      expect.objectContaining({
        title: 'Embalagem teste 1',
        content: 'Embalagem teste 1',
        status: PackageStatus.PICKUP,
        delivererId: 'sded4c84w81x2c18cec8wxcd5',
        recipientId: '8fewc55wd1ce5wc1we51sd5c1',
      }),
    )
  })
})
