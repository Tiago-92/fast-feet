import { PrismaService } from '@/prisma/prisma.service'
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { UserRole } from '@prisma/client'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: any) {
    const { name, email, password, role } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException('User with same e-mail adress already exists')
    }

    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
      },
    })
  }
}
