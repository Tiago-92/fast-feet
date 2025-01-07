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
import { CreateDeliveredDriverUseCase } from './domain/use-cases/create-delivered-driver'
import { DeliveredDriverRepository } from './domain/package/application/repositories/delivered-driver-repository'
import { PrismaDeliveredDriverRepository } from './infra/database/repositories/prisma-delivered-driver-repository'
import { FetchDeliveredDriverById } from './controllers/fetch-delivered-driver-by-id'
import { GetDeliveredDriverUserCase } from './domain/use-cases/get-delivered-driver'

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
    FetchDeliveredDriverById,
  ],
  providers: [
    PrismaService,
    CreateDeliveredDriverUseCase,
    PackageUseCase,
    AccountUseCase,
    GetDeliveredDriverUserCase,
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
