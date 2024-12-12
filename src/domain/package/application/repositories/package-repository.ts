import { Package } from '../../enterprise/entities/package'

export interface PackageRepository {
  create(packageContent: Package): Promise<void>
}
