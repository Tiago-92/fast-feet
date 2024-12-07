import { Entity } from 'src/core/entity'

interface RecipientProps {
  name: string
}

export class Recipient extends Entity<RecipientProps> {
  get name() {
    return this.props.name
  }
}
