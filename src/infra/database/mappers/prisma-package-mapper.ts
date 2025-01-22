import { UniqueEntityID } from '@/core/unique-entity-id'
import { Package } from '@/domain/package/enterprise/entities/package'
import { PackageStatus, Prisma, Package as PrismaPackage } from '@prisma/client'

export class PrismaPackageMapper {
  static toDomain(raw: PrismaPackage): Package {
    return Package.create(
      {
        delivererId: new UniqueEntityID(raw.delivererId),
        recipientId: new UniqueEntityID(raw.recipientId),
        title: raw.title,
        content: raw.content,
        status: raw.status as PackageStatus,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(packageContent: Package): Prisma.PackageUncheckedCreateInput {
    return {
      id: packageContent.id.toString(),
      delivererId: packageContent.delivererId.toString(),
      recipientId: packageContent.recipientId.toString(),
      title: packageContent.title,
      content: packageContent.content,
      status: packageContent.status,
      createdAt: packageContent.createdAt,
    }
  }

  static toDomainArray(rawArray: PrismaPackage[]): Package[] {
    return rawArray.map(this.toDomain)
  }
}
