import { UniqueEntityID } from '@/core/unique-entity-id'
import { Package } from '@/domain/package/enterprise/entities/package'
import { Prisma, Package as PrismaPackage } from '@prisma/client'
import { PackageStatusEnum } from '@/domain/enums/package-status-enum'

export class PrismaPackageMapper {
  static toDomain(raw: PrismaPackage): Package {
    return Package.create(
      {
        delivererId: new UniqueEntityID(raw.delivererId),
        recipientId: new UniqueEntityID(raw.recipientId),
        title: raw.title,
        content: raw.content,
        status: raw.status as PackageStatusEnum,
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
}
