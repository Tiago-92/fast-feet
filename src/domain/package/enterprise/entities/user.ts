import { UniqueEntityID } from '@/core/unique-entity-id'
import { UserRole } from '@prisma/client'
import { Entity } from 'src/core/entity'

export interface UserProps {
  name: string
  email: string
  password: string
  role: UserRole
  latitude: string
  longitude: string
  phone: string
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

  get latitue() {
    return this.props.latitude
  }

  get longitude() {
    return this.props.longitude
  }

  get phone() {
    return this.props.phone
  }

  public getProps() {
    return this.props
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(props, id)

    return user
  }
}
