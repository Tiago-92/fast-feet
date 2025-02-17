import { UniqueEntityID } from 'src/core/unique-entity-id'
import { Entity } from 'src/core/entity'
import { Optional } from '@/core/types'
import { PackageStatus } from '@prisma/client'

export interface PackageProps {
  title: string
  content: string
  status: PackageStatus
  createdAt: Date
  recipientId: string | UniqueEntityID
  delivererId: string | UniqueEntityID
  latitude: string
  longitude: string
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

  get delivererId() {
    return this.props.delivererId
  }

  get latitude() {
    return this.props.latitude
  }

  get longitude() {
    return this.props.latitude
  }

  set content(content: string) {
    this.props.content = content
  }

  public getProps() {
    return this.props
  }

  static create(
    props: Optional<PackageProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const packageContent = new Package(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return packageContent
  }
}
