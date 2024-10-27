import { randomUUID } from "node:crypto"

export class Order {
  public id: string
  public title: string
  public photo: string
  public status: Enumerator

  constructor(title: string, photo: string, status: Enumerator, id?: string) {
    this.id = id ?? randomUUID()
    this.title = title
    this.photo = photo
    this.status = status
  }
}