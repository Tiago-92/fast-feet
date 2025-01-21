import { Package } from '@/domain/package/enterprise/entities/package'
import { PackageRepository } from '@/domain/package/application/repositories/package-repository'
import { PackageStatusEnum } from '@/domain/enums/package-status-enum'

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

  async update(
    id: string,
    data: {
      title: string
      content: string
      status: PackageStatusEnum
      recipientId: string
      delivererId: string
    },
  ): Promise<Package> {
    const index = this.items.findIndex(
      (packageContent) => packageContent.id.toString() === id,
    )

    if (index === -1) {
      throw new Error('A imbalagem não foi encontrada 404')
    }

    const packageContent = this.items[index]
    const updatedProps = {
      ...data,
    }
    const updatedPackage = Package.create(updatedProps, packageContent.id)

    this.items[index] = updatedPackage

    return updatedPackage
  }
}
