import { UniqueEntityID } from '@/core/unique-entity-id'
import {
  Package,
  PackageProps,
} from '@/domain/package/enterprise/entities/package'
import { PrismaPackageMapper } from '@/infra/database/mappers/prisma-package-mapper'
import { PrismaService } from '@/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { PackageStatus } from '@prisma/client'
import { UserFactory } from './user-factory'

@Injectable()
export class MakePackage {
  constructor(
    private prisma: PrismaService,
    private userFactory: UserFactory,
  ) {}

  async makePackage(
    override: Partial<PackageProps> = {},
    id?: UniqueEntityID,
  ): Promise<Package> {
    const deliveredDriver = await this.userFactory.makePrismaUser({
      email: 'jose@teste.com',
    })
    const delivererId = deliveredDriver.id.toString()

    const recipient = await this.userFactory.makePrismaUser({
      role: 'RECIPIENT',
    })
    const recipientId = recipient.id.toString()

    const packageContent = Package.create(
      {
        delivererId,
        recipientId,
        createdAt: new Date(),
        title: faker.commerce.productName(),
        content: faker.lorem.sentence(),
        latitude: faker.location.latitude().toPrecision(6),
        longitude: faker.location.longitude().toPrecision(6),
        status: PackageStatus.DELIVERED,
        ...override,
      },
      id,
    )

    return packageContent
  }
}

@Injectable()
export class PackageFactory {
  constructor(
    private prisma: PrismaService,
    private makePackage: MakePackage,
  ) {}

  async makePrismaPackage(data: Partial<PackageProps> = {}): Promise<Package> {
    const packageContent = await this.makePackage.makePackage(data)

    await this.prisma.package.create({
      data: PrismaPackageMapper.toPrisma(packageContent),
    })

    return packageContent
  }
}
