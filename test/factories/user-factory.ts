import { UserRoleEnum } from '@/domain/enums/user-role-enum'
import { User } from '@/domain/package/enterprise/entities/user'
import { faker } from '@faker-js/faker/.'

export function makeUser() {
  const user = User.create({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: UserRoleEnum.DELIVERED_DRIVER,
  })

  return user
}
