import { Injectable } from '@nestjs/common'
import { UserRepository } from '../package/application/repositories/user-repository'
import { Either, right } from '@/core/either'
import { User } from '../package/enterprise/entities/user'
import { UserRoleEnum } from '../enums/user-role-enum'
import { UserRole } from '@prisma/client'

interface AccountUseCaseRequest {
  name: string
  email: string
  password: string
  role: UserRole
}

type AccountUseCaseResponse = Either<null, { account: User }>

@Injectable()
export class AccountUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
    role,
  }: AccountUseCaseRequest): Promise<AccountUseCaseResponse> {
    const account = User.create({
      name,
      email,
      password,
      role,
    })

    await this.userRepository.create(account)

    return right({
      account,
    })
  }
}
