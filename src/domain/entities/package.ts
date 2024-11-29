import { randomUUID } from "crypto"
import { PackageStatusEnum } from "../value-objects/package-stauts-enum"

export class Package {
  public id: string
  public title: string
  public content: string
  public status: PackageStatusEnum

  constructor(title: string, content: string, status: PackageStatusEnum, id?: string) {
    this.id = id ?? randomUUID()
    this.title = title
    this.content = content
    this.status = status
  }
}