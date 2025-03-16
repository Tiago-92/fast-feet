import { PackagePhotoRepository } from '@/domain/package/application/repositories/package-photo-repository'
import { PackagePhoto } from '@/domain/package/enterprise/entities/package-photo'
import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaPackagePhotoMapper } from '../mappers/prisma-package-photo-mapper'

@Injectable()
export class PrismaPackagePhotoRepository implements PackagePhotoRepository {
  constructor(private prisma: PrismaService) {}

  async create(packagePhoto: PackagePhoto): Promise<void> {
    const data = PrismaPackagePhotoMapper.toPrisma(packagePhoto)

    await this.prisma.photo.create({
      data,
    })
  }

  async findByPackageId(packageId: string): Promise<PackagePhoto | null> {
    const photo = await this.prisma.photo.findFirst({
      where: { packageId },
    })

    if (!photo) {
      return null
    }

    return PrismaPackagePhotoMapper.toDomain(photo)
  }
}
