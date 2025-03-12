import { Entity } from '@/core/entity'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface PackagePhotoProps {
  title: string
  url: string
  packageId: string | UniqueEntityID
}

export class PackagePhoto extends Entity<PackagePhotoProps> {
  get title() {
    return this.props.title
  }

  get url() {
    return this.props.url
  }

  get packageId() {
    return this.props.packageId
  }

  static create(props: PackagePhotoProps, id?: UniqueEntityID) {
    const photo = new PackagePhoto(props, id)

    return photo
  }
}
