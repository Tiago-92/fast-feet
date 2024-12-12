import { Entity } from 'src/core/entity'

interface UserProps {
  name: string
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }
}
