import { hash } from 'bcryptjs'
import { z } from 'zod'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Injectable,
  Post,
} from '@nestjs/common'
import { AccountUseCase } from '@/domain/use-cases/account'
import { UserRoleEnum } from '@/domain/enums/user-role-enum'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.nativeEnum(UserRoleEnum),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

Injectable()
@Controller('/accounts')
export class CreateAccountController {
  constructor(private createAccount: AccountUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password, role } = createAccountBodySchema.parse(body)

    const hashedPassword = await hash(password, 8)

    const result = await this.createAccount.execute({
      name,
      email,
      password: hashedPassword,
      role,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
