import { Package } from '../../enterprise/entities/package'

export abstract class PackageRepository {
  abstract create(packageContent: Package): Promise<void>
  abstract findById(id: string): Promise<Package | null>
  abstract findAll(): Promise<Package[]>
}
