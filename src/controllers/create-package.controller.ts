import { PackageUseCase } from '@/domain/use-cases/package'
import { Roles } from '@/infra/decorators/roles.decorator'
import { RolesGuard } from '@/infra/guards/roles.guard'
import {
  Controller,
  Post,
  Body,
  HttpCode,
  BadRequestException,
  Injectable,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOperation } from '@nestjs/swagger'
import { PackageStatus } from '@prisma/client'
import { z } from 'zod'

const createPackageBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  status: z.nativeEnum(PackageStatus),
  delivererId: z.string(),
  recipientId: z.string(),
  latitude: z.string(),
  longitude: z.string(),
})

type CreatePackageBodySchema = z.infer<typeof createPackageBodySchema>

@Injectable()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('/packages')
export class CreatePackageController {
  constructor(private createPackage: PackageUseCase) {}

  @Post()
  @HttpCode(201)
  @Roles('DELIVERED_DRIVER')
  @ApiOperation({ summary: 'Create a new package' })
  async handle(@Body() body: CreatePackageBodySchema) {
    const {
      title,
      content,
      status,
      delivererId,
      recipientId,
      latitude,
      longitude,
    } = createPackageBodySchema.parse(body)

    const result = await this.createPackage.execute({
      title,
      content,
      status,
      delivererId,
      recipientId,
      latitude,
      longitude,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
