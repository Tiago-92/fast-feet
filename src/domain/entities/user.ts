import { randomUUID } from "node:crypto"

export class User {
  public id: string
  public user: string

  constructor(user: string, id?: string) {
    this.user = user
    this.id = id ?? randomUUID()
  }
}