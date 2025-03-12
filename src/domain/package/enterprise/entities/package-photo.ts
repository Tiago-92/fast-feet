import { Entity } from '@/core/entity'
import { UniqueEntityID } from '@/core/unique-entity-id'

interface PackagePhotoProps {
  title: string
  url: string
}

export class PackagePhoto extends Entity<PackagePhotoProps> {
  get title() {
    return this.props.title
  }

  get url() {
    return this.props.url
  }

  static create(props: PackagePhotoProps, id?: UniqueEntityID) {
    const photo = new PackagePhoto(props, id)

    return photo
  }
}
