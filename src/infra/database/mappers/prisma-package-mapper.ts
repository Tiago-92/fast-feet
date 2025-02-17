import { UniqueEntityID } from '@/core/unique-entity-id'
import {
  Package,
  PackageProps,
} from '@/domain/package/enterprise/entities/package'
import { Prisma, Package as PrismaPackage } from '@prisma/client'

export class PrismaPackageMapper {
  static toDomain(raw: PrismaPackage): Package {
    if (!raw.delivererId || !raw.recipientId) {
      throw new Error('Both delivererId and recipientId must be provided.')
    }
    const packageProps: PackageProps = {
      delivererId: new UniqueEntityID(raw.delivererId),
      title: raw.title,
      content: raw.content,
      status: raw.status,
      createdAt: raw.createdAt,
      recipientId: new UniqueEntityID(raw.recipientId),
      latitude: raw.latitude,
      longitude: raw.longitude,
    }

    return Package.create(packageProps)
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
      latitude: packageContent.latitude,
      longitude: packageContent.longitude,
    }
  }

  static toDomainArray(rawArray: PrismaPackage[]): Package[] {
    return rawArray.map(this.toDomain)
  }
}
