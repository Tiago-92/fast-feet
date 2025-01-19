import { Package } from '@/domain/package/enterprise/entities/package'
import { PackageRepository } from '@/domain/package/application/repositories/package-repository'

export class InMemoryPackageRepository implements PackageRepository {
  public items: Package[] = []

  async create(packageContent: Package) {
    this.items.push(packageContent)
  }

  async findById(id: string): Promise<Package | null> {
    const packageFound = this.items.find((user) => user.id.toString() === id)

    if (!packageFound) {
      throw new Error('Esse pacote não foi encontrado.')
    }

    return packageFound
  }

  async findAll(): Promise<Package[]> {
    const allPackages = this.items

    return allPackages
  }
}
