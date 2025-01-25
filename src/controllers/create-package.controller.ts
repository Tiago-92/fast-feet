import { PackageUseCase } from '@/domain/use-cases/package'
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

/* class CreatePackageDto {
  title: string
  content: string
  status: PackageStatus
  delivererId: string
  recipientId: string

  constructor(
    title: string,
    content: string,
    status: PackageStatus,
    delivererId: string,
    recipientId: string,
  ) {
    this.title = title
    this.content = content
    this.status = status
    this.delivererId = delivererId
    this.recipientId = recipientId
  }
} */

@Injectable()
@Controller('/packages')
@UseGuards(AuthGuard('jwt'))
export class CreatePackageController {
  constructor(private createPackage: PackageUseCase) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new user' })
  /* @ApiBody({ type: CreatePackageDto }) */
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
