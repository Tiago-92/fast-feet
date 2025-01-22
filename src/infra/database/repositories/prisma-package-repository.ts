import { PackageRepository } from '@/domain/package/application/repositories/package-repository'
import { Package } from '@/domain/package/enterprise/entities/package'
import { PrismaService } from '@/prisma/prisma.service'
import { PrismaPackageMapper } from '../mappers/prisma-package-mapper'
import { Injectable } from '@nestjs/common'
import { PackageStatus } from '@prisma/client'

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
      throw new Error('A encomenda não foi encontrada.')
    }

    return PrismaPackageMapper.toDomain(packageContent)
  }

  async findAll(): Promise<Package[]> {
    const allPackages = await this.prisma.package.findMany()

    return PrismaPackageMapper.toDomainArray(allPackages)
  }

  async update(
    id: string,
    data: { title: string; content: string; status: PackageStatus },
  ): Promise<Package | null> {
    const updatePackage = await this.prisma.package.update({
      where: { id },
      data,
    })

    if (!updatePackage) {
      return null
    }

    return PrismaPackageMapper.toDomain(updatePackage)
  }

  async getStatus() {
    return Object.values(PackageStatus)
  }
}
