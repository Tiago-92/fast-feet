import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service' // Certifique-se de que o PrismaService está importado
import { PackageUseCase } from '@/domain/use-cases/package'
import { PrismaPackageRepository } from './infra/database/repositories/prisma-package-repository'
import { PackageRepository } from '@/domain/package/application/repositories/package-repository'
import { CreatePackageController } from './controllers/create-package.controller'

@Module({
  imports: [],
  controllers: [CreatePackageController],
  providers: [
    PrismaService,
    PackageUseCase,
    {
      provide: PackageRepository,
      useClass: PrismaPackageRepository,
    },
  ],
})
export class AppModule {}
