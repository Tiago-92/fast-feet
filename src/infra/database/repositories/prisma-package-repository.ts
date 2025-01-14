import { PackageRepository } from '@/domain/package/application/repositories/package-repository'
import { Package } from '@/domain/package/enterprise/entities/package'
import { PrismaService } from '@/prisma/prisma.service'
import { PrismaPackageMapper } from '../mappers/prisma-package-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaPackageRepository implements PackageRepository {
  constructor(private prisma: PrismaService) {}

  async create(packageContent: Package): Promise<void> {
    const prismaPackageData = PrismaPackageMapper.toPrisma(packageContent)

    await this.prisma.package.create({
      data: prismaPackageData,
    })
  }

  async findById(id: string): Promise<Package | null> {
    const packageContent = await this.prisma.package.findUnique({
      where: { id },
    })

    if (!packageContent) {
      throw new Error('A emcomenda não foi encontrada.')
    }

    return PrismaPackageMapper.toDomain(packageContent)
  }
}
