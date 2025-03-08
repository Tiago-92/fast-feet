import { hash } from 'bcryptjs'
import { z } from 'zod'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Injectable,
  Post,
  UsePipes,
} from '@nestjs/common'
import { AccountUseCase } from '@/domain/use-cases/account'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { UserRole } from '@prisma/client'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.nativeEnum(UserRole),
  latitude: z.string(),
  longitude: z.string(),
  phone: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

Injectable()
@Controller('/accounts')
export class CreateAccountController {
  constructor(private createAccount: AccountUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password, role, latitude, longitude, phone } = body

    const hashedPassword = await hash(password, 8)

    const result = await this.createAccount.execute({
      name,
      email,
      password: hashedPassword,
      role,
      latitude,
      longitude,
      phone,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
