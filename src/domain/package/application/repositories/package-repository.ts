import { Package } from '../../enterprise/entities/package'

export abstract class PackageRepository {
  abstract create(packageContent: Package): Promise<void>
}
