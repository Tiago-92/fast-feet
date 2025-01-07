import { InMemoryAccountRepository } from 'test/repositories/in-memory-account-repository'
import { AccountUseCase } from './account'
import { UserRoleEnum } from '../enums/user-role-enum'

let inMemoryAccountRepository: InMemoryAccountRepository
let sut: AccountUseCase

describe('Register User', () => {
  beforeEach(() => {
    inMemoryAccountRepository = new InMemoryAccountRepository()
    sut = new AccountUseCase(inMemoryAccountRepository)
  })

  it('should be abre to register a new user', async () => {
    const result = await sut.execute({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: UserRoleEnum.RECIPIENT,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAccountRepository.items[0]).toEqual(result.value?.account)
  })
})
