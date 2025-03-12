import { PackagePhotoRepository } from '@/domain/package/application/repositories/package-photo-repository'
import { PackagePhoto } from '@/domain/package/enterprise/entities/package-photo'

export class InMemoryPackagePhotoRepository implements PackagePhotoRepository {
  public items: PackagePhoto[] = []

  async create(packagePhoto: PackagePhoto) {
    this.items.push(packagePhoto)
  }
}
