import {
  PackagePhoto,
  PackagePhotoProps,
} from '@/domain/package/enterprise/entities/package-photo'
import { Prisma, Photo as PrismaPhoto } from '@prisma/client'

export class PrismaPackagePhotoMapper {
  static toDomain(raw: PrismaPhoto): PackagePhoto {
    const packageProps: PackagePhotoProps = {
      title: raw.title,
      url: raw.url,
      packageId: raw.packageId,
    }

    return PackagePhoto.create(packageProps)
  }

  static toPrisma(
    packagePhoto: PackagePhoto,
  ): Prisma.PhotoUncheckedCreateInput {
    return {
      id: packagePhoto.id.toString(),
      title: packagePhoto.title,
      url: packagePhoto.url,
      packageId: packagePhoto.packageId.toString(),
    }
  }

  /* static toDomainArray(rawArray: PrismaPackage[]): Package[] {
    return rawArray.map(this.toDomain)
  } */
}
