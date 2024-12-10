import { Entity } from 'src/core/entity'

interface DeliveryDriverProps {
  name: string
}

export class DeliveryDriver extends Entity<DeliveryDriverProps> {
  get name() {
    return this.props.name
  }
}
