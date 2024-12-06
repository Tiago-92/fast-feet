import { PackageStatusEnum } from "../enums/package-status-enum"
import { Entity } from "src/core/entity"

interface PackageProps {
  title: string
  content: string
  recipientId: string
  deliveryDriverId: string
  status: PackageStatusEnum
}

export class Package extends Entity<PackageProps> {
  get content() {
    return this.props.content
  }
}