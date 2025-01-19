import { PackageStatusEnum } from '@/domain/enums/package-status-enum'
import { Package } from '../../enterprise/entities/package'

export abstract class PackageRepository {
  abstract create(packageContent: Package): Promise<void>
  abstract findById(id: string): Promise<Package | null>
  abstract findAll(): Promise<Package[]>
  abstract update(
    id: string,
    data: { title: string; content: string; status: PackageStatusEnum },
  ): Promise<Package | null>
}
