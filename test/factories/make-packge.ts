import { UniqueEntityID } from '@/core/unique-entity-id'
import { PackageStatusEnum } from '@/domain/enums/package-status-enum'
import { Package } from '@/domain/package/enterprise/entities/package'

export function makePackage() {
  const packageContent = Package.create({
    deliveryDriverId: new UniqueEntityID(),
    recipientId: new UniqueEntityID(),
    createdAt: new Date(),
    title: 'Novo pacote',
    content: 'Novo pacote',
    status: PackageStatusEnum.DELIVERED,
  })

  return packageContent
}
