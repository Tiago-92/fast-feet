import { Package } from '@/domain/package/enterprise/entities/package'
import { PackageRepository } from '@/domain/package/application/repositories/package-repository'
import { PackageStatus } from '@prisma/client'

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
      status: PackageStatus
      recipientId: string
      delivererId: string
    },
  ): Promise<Package> {
    const index = this.items.findIndex(
      (packageContent) => packageContent.id.toString() === id,
    )

    if (index === -1) {
      throw new Error('A embalagem não foi encontrada 404')
    }

    const packageContent = this.items[index]
    const updatedProps = {
      ...data,
    }
    const updatedPackage = Package.create(updatedProps, packageContent.id)

    this.items[index] = updatedPackage

    return updatedPackage
  }

  async getStatus(): Promise<PackageStatus[]> {
    return Object.values(PackageStatus)
  }

  async updateStatus(id: string, status: PackageStatus): Promise<Package> {
    if (!Object.values(PackageStatus).includes(status)) {
      throw new Error(`Invalid status: ${status}`)
    }

    const packageIndex = this.items.findIndex((pkg) => pkg.id.toString() === id)

    if (packageIndex === -1) {
      throw new Error(`Package with ID ${id} not found`)
    }

    const currentPackage = this.items[packageIndex]

    const updatedPackage = Package.create(
      {
        title: currentPackage.title,
        content: currentPackage.content,
        status,
        recipientId: currentPackage.recipientId,
        delivererId: currentPackage.delivererId,
        createdAt: currentPackage.createdAt,
        latitude: currentPackage.latitude,
        longitude: currentPackage.longitude,
      },
      currentPackage.id,
    )

    this.items[packageIndex] = updatedPackage

    return updatedPackage
  }
}
