import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PackageUseCase } from '@/domain/use-cases/package'
import { PrismaPackageRepository } from './infra/database/repositories/prisma-package-repository'
import { PackageRepository } from '@/domain/package/application/repositories/package-repository'
import { CreatePackageController } from './controllers/create-package.controller'
import { AccountUseCase } from './domain/use-cases/account'
import { UserRepository } from './domain/package/application/repositories/user-repository'
import { PrismaUserRepository } from './infra/database/repositories/prisma-user-repository'
import { CreateAccountController } from './controllers/create-account.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/authenticate-controller'
import { DeliveredDriverController } from './controllers/delete-delivered-driver-controller'
import { DeliveredDriverUseCase } from './domain/use-cases/delivered-driver'
import { DeliveredDriverRepository } from './domain/package/application/repositories/delivered-driver-repository'
import { PrismaDeliveredDriverRepository } from './infra/database/repositories/prisma-delivered-driver-repository'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    DeliveredDriverController,
    CreatePackageController,
    CreateAccountController,
    AuthenticateController,
  ],
  providers: [
    PrismaService,
    DeliveredDriverUseCase,
    PackageUseCase,
    AccountUseCase,
    {
      provide: PackageRepository,
      useClass: PrismaPackageRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: DeliveredDriverRepository,
      useClass: PrismaDeliveredDriverRepository,
    },
  ],
})
export class AppModule {}
