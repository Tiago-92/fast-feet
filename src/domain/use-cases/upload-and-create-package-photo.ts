import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { InvalidAttachmentTypeError } from './errors/invalid-image-type'
import { Uploader } from '../package/application/storage/uploader'
import { PackagePhoto } from '../package/enterprise/entities/package-photo'
import { PackagePhotoRepository } from '../package/application/repositories/package-photo-repository'
import { UniqueEntityID } from '@/core/unique-entity-id'

interface UploadAndCreatePackagePhotoUseCaseRequest {
  fileName: string
  fileType: string
  packageId: string | UniqueEntityID
  body: Buffer
}

type UploadAndCreatePackagePhotoUseCaseResponse = Either<
  InvalidAttachmentTypeError,
  {
    packagePhoto: PackagePhoto
  }
>

@Injectable()
export class UploadAndCreatePackagePhotoUseCase {
  constructor(
    private packagePhotoRepository: PackagePhotoRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    packageId,
    body,
  }: UploadAndCreatePackagePhotoUseCaseRequest): Promise<UploadAndCreatePackagePhotoUseCaseResponse> {
    if (!/^(image\/(jpeg|jpg|png))$/.test(fileType)) {
      return left(new InvalidAttachmentTypeError(fileType))
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    const packagePhoto = PackagePhoto.create({
      title: fileName,
      url,
      packageId,
    })

    await this.packagePhotoRepository.create(packagePhoto)

    return right({
      packagePhoto,
    })
  }
}
