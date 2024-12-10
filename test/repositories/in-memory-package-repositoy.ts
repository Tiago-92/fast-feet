import { Package } from '@/domain/entities/package'
import { PackageRepository } from '@/domain/repositories/package-repository'

export class InMemoryPackageRepository implements PackageRepository {
  public items: Package[] = []

  async create(packageContent: Package) {
    this.items.push(packageContent)
  }
}
