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
import { DeleteDeliveredDriverUseCase } from './domain/use-cases/delete-delivered-driver'
import { DeliveredDriverRepository } from './domain/package/application/repositories/delivered-driver-repository'
import { PrismaDeliveredDriverRepository } from './infra/database/repositories/prisma-delivered-driver-repository'
import { FetchDeliveredDriverById } from './controllers/fetch-delivered-driver-by-id'
import { GetDeliveredDriverUserCase } from './domain/use-cases/get-delivered-driver'
import { UpdateDeliveredDriverUseCase } from './domain/use-cases/update-delivered-driver'
import { UpdateDeliveredDriverController } from './controllers/update-delivered-driver.controller'
import { GetPackageController } from './controllers/get-package-controller'
import { GetPackageUseCase } from './domain/use-cases/get-package'
import { GetAllPackageUseCase } from './domain/use-cases/get-all-packages'
import { GetAllPackageController } from './controllers/get-all-packages.controller'
import { UpdatePackageController } from './controllers/update-package-controller'
import { UpdatePackeUseCase } from './domain/use-cases/update-package'
import { GetStatusUseCase } from './domain/use-cases/get-package-status'
import { GetStatusController } from './controllers/get-status-controller'
import { UpdatePackageStatusController } from './controllers/update-package-status-controller'
import { UpdatePackageStatusUseCase } from './domain/use-cases/update-package-status'
import { ListDeliveryAddressForDeliveredDriverUseCase } from './domain/use-cases/list-delivery-adress-for-delivered-driver'
import { ListDeliveryAddressForDeliveredDriverController } from './controllers/list-delivery-adress-for-delivered-driver-controller'
import { UpdateUserPasswordController } from './controllers/update-user-password-controller.ts'
import { UpdateUserPasswordUseCase } from './domain/use-cases/update-user-password'
import { GetPackageByUserIdController } from './controllers/get-packages-by-user-id'
import { GetPackagesByUserIdUseCase } from './domain/use-cases/get-packages-by-user-id'
import { NotifyRecipientUseCase } from './domain/use-cases/notify-recipeint'

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
    UpdateDeliveredDriverController,
    GetPackageController,
    GetAllPackageController,
    UpdatePackageController,
    GetStatusController,
    UpdatePackageStatusController,
    ListDeliveryAddressForDeliveredDriverController,
    UpdateUserPasswordController,
    GetPackageByUserIdController,
  ],
  providers: [
    PrismaService,
    DeleteDeliveredDriverUseCase,
    PackageUseCase,
    AccountUseCase,
    GetDeliveredDriverUserCase,
    UpdateDeliveredDriverUseCase,
    GetPackageUseCase,
    GetAllPackageUseCase,
    UpdatePackeUseCase,
    GetStatusUseCase,
    UpdatePackageStatusUseCase,
    ListDeliveryAddressForDeliveredDriverUseCase,
    UpdateUserPasswordUseCase,
    GetPackagesByUserIdUseCase,
    NotifyRecipientUseCase,
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
