import { UniqueEntityID } from '@/core/unique-entity-id'
import { Entity } from 'src/core/entity'

interface DeliveredDriverProps {
  id: UniqueEntityID
  name?: string
  email?: string
}

export class DeliveredDriver extends Entity<DeliveredDriverProps> {
  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }
}
