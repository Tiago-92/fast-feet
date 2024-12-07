import { Entity } from 'src/core/entity'

interface DeliveryDriverProps {
  name: string
}

export class DeliveryDriver {
  public id: string
  public name: string

  constructor(name: string, id?: string) {
    this.name = name
    this.id = id ?? randomUUID()
  }
}
