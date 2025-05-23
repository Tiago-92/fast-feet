import { PackagePhoto } from '../../enterprise/entities/package-photo'

export abstract class PackagePhotoRepository {
  abstract create(packagePhoto: PackagePhoto): Promise<void>
  abstract findByPackageId(packageId: string): Promise<PackagePhoto | null>
}
