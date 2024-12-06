import { test, expect } from 'vitest'
import { PackageUseCase } from './package'
import { PackageStatusEnum } from '../enums/package-status-enum'
import { PackageRepository } from '../repositories/package-repository'
import { Package } from '../entities/package'

const fakePackageRepository: PackageRepository = {
  create: async (packageContent: Package) => {
    return;
  }
}

test('create an package', async () => {
  const packageUseCase = new PackageUseCase(fakePackageRepository)

  const newPackage = await packageUseCase.execute({
    deliveryDriverId: '1',
    recipientId: '1',
    title: 'Novo pacote',
    content: 'Novo pacote',
    status: PackageStatusEnum.DELIVERED,
  })

  expect(newPackage.content).toEqual('Novo pacote')
})