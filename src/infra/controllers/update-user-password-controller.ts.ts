import { UpdateUserPasswordUseCase } from '@/domain/use-cases/update-user-password'
import {
  Controller,
  Patch,
  HttpCode,
  Injectable,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { hash } from 'bcryptjs'
import { RolesGuard } from '../guards/roles.guard'
import { Roles } from '../decorators/roles.decorator'

@Injectable()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('/password/update/:id')
export class UpdateUserPasswordController {
  constructor(private updatePasswordUseCase: UpdateUserPasswordUseCase) {}

  @Patch()
  @HttpCode(200)
  @Roles('DELIVERED_DRIVER')
  async handle(@Param('id') id: string, @Body('password') password: string) {
    const hashedPassword = await hash(password, 8)

    const result = await this.updatePasswordUseCase.execute(id, hashedPassword)

    return result
  }
}
