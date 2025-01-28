import { UpdateUserPasswordUseCase } from '@/domain/use-cases/update-user-password'
import {
  Controller,
  Patch,
  HttpCode,
  Injectable,
  Param,
  Body,
} from '@nestjs/common'
import { hash } from 'bcryptjs'

@Injectable()
@Controller('/password/update/:id')
export class UpdateUserPasswordController {
  constructor(private updatePasswordUseCase: UpdateUserPasswordUseCase) {}

  @Patch()
  @HttpCode(200)
  async handle(@Param('id') id: string, @Body('password') password: string) {
    const hashedPassword = await hash(password, 8)

    const result = await this.updatePasswordUseCase.execute(id, hashedPassword)

    return result
  }
}
