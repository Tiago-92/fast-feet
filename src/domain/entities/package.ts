import { randomUUID } from "crypto"
import { PackageStatusEnum } from "../value-objects/package-status-enum"

interface PackageProps {
  title: string
  content: string
  recipientId: string
  deliveryDriverId: string
  status: PackageStatusEnum
}

export class Package {
  public id: string
  public title: string
  public content: string
  public recipientId: string
  public deliveryDriverId: string
  public status: PackageStatusEnum

  constructor(props: PackageProps, id?: string) {
    this.id = id ?? randomUUID()
    this.title = props.title
    this.content = props.content
    this.status = props.status
    this.recipientId = props.recipientId
    this.deliveryDriverId = props.deliveryDriverId
  }
}