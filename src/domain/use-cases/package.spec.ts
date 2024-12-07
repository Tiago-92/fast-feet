import { PackageUseCase } from './package'
import { PackageStatusEnum } from '../enums/package-status-enum'
import { PackageRepository } from '../repositories/package-repository'
import { Package } from '../entities/package'
import { UniqueEntityID } from 'src/core/unique-entity-id'

const fakePackageRepository: PackageRepository = {
  create: async (packageContent: Package) => {
    return packageContent
  },
}

test('create an package', async () => {
  const packageUseCase = new PackageUseCase(fakePackageRepository)

  const newPackage = await packageUseCase.execute({
    deliveryDriverId: new UniqueEntityID(),
    recipientId: new UniqueEntityID(),
    createdAt: new Date(),
    title: 'Novo pacote',
    content: 'Novo pacote',
    status: PackageStatusEnum.DELIVERED,
  })

  expect(newPackage.content).toEqual('Novo pacote')
})
