import { UniqueEntityID } from '@/core/unique-entity-id'
import { UserRoleEnum } from '@/domain/enums/user-role-enum'
import { Entity } from 'src/core/entity'

interface UserProps {
  name: string
  email: string
  password: string
  role: UserRoleEnum
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get role() {
    return this.props.role
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(props, id)

    return user
  }
}
