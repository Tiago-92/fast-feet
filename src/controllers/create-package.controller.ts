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
import { PackageStatus } from '@prisma/client'
import { z } from 'zod'

const createPackageBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  status: z.nativeEnum(PackageStatus),
  delivererId: z.string(),
  recipientId: z.string(),
})

type CreatePackageBodySchema = z.infer<typeof createPackageBodySchema>

@Injectable()
@Controller('/packages')
@UseGuards(AuthGuard('jwt'))
export class CreatePackageController {
  constructor(private createPackage: PackageUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreatePackageBodySchema) {
    const { title, content, status, delivererId, recipientId } =
      createPackageBodySchema.parse(body)

    const result = await this.createPackage.execute({
      title,
      content,
      status,
      delivererId,
      recipientId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
