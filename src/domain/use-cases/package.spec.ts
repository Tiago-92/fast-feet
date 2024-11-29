import { test, expect } from 'vitest'
import { PackageUseCase } from './package'
import { PackageStatusEnum } from '../value-objects/package-status-enum'

test('create an package', () => {
  const packageUseCase = new PackageUseCase()

  const newPackage = packageUseCase.execute({
    deliveryDriverId: '1',
    recipientId: '1',
    title: 'Novo pacote',
    content: 'Novo pacote',
    status: PackageStatusEnum.DELIVERED,
  })

  expect(newPackage.content).toEqual('Novo pacote')
})