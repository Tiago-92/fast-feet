import { Entity } from 'src/core/entity'

interface UserProps {
  name: string
  email: string
  passwaord: string
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.passwaord
  }
}
