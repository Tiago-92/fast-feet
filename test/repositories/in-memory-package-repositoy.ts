import { Package } from '@/domain/package/enterprise/entities/package'
import { PackageRepository } from '@/domain/package/application/repositories/package-repository'

export class InMemoryPackageRepository implements PackageRepository {
  public items: Package[] = []

  async create(packageContent: Package) {
    this.items.push(packageContent)
  }
}
