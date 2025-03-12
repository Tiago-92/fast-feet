import { PackagePhoto } from '@/domain/package/enterprise/entities/package-photo'

export abstract class PackagePhotoRepository {
  abstract create(packagePhoto: PackagePhoto): Promise<void>
}
