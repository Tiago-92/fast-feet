import { UniqueEntityID } from 'src/core/unique-entity-id'
import { PackageStatusEnum } from '@/domain/enums/package-status-enum'
import { Entity } from 'src/core/entity'
import { Optional } from '@/core/types'

interface PackageProps {
  title: string
  content: string
  status: PackageStatusEnum
  createdAt: Date
  recipientId: UniqueEntityID
  deliveryDriverId: UniqueEntityID
}

export class Package extends Entity<PackageProps> {
  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get status() {
    return this.props.status
  }

  get createdAt() {
    return this.props.createdAt
  }

  get recipientId() {
    return this.props.recipientId
  }

  get deliveryDriverId() {
    return this.props.deliveryDriverId
  }

  set content(content: string) {
    this.props.content = content
  }

  static create(
    props: Optional<PackageProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const packageContent = new Package(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return packageContent
  }
}
