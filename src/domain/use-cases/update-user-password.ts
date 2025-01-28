import { Injectable } from '@nestjs/common'
import { UserRepository } from '../package/application/repositories/user-repository'

@Injectable()
export class UpdateUserPasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, status: string) {
    const updatedPassword = await this.userRepository.updatePassword(id, status)

    return updatedPassword
  }
}
