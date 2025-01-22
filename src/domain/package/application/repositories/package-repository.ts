import { Package } from '../../enterprise/entities/package'
import { PackageStatus } from '@prisma/client'

export abstract class PackageRepository {
  abstract create(packageContent: Package): Promise<void>
  abstract findById(id: string): Promise<Package | null>
  abstract findAll(): Promise<Package[]>
  abstract getStatus(): Promise<PackageStatus[]>
  abstract updateStatus(id: string, status: PackageStatus): Promise<Package>
  abstract update(
    id: string,
    data: {
      title: string
      content: string
      status: PackageStatus
      recipientId: string
      delivererId: string
    },
  ): Promise<Package | null>
}
