import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { InvalidAttachmentType } from './errors/invalid-image-type'
import { Uploader } from '../package/application/storage/uploader'
import { PackagePhoto } from '../package/enterprise/entities/package-photo'
import { PackagePhotoRepository } from '../package/application/repositories/package-photo-repository'

interface UploadAndCreatePackagePhotoUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadAndCreatePackagePhotoUseCaseResponse = Either<
  InvalidAttachmentType,
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
    body,
  }: UploadAndCreatePackagePhotoUseCaseRequest): Promise<UploadAndCreatePackagePhotoUseCaseResponse> {
    if (!/^(image\/(jpeg|jpg|png))$/.test(fileType)) {
      return left(new InvalidAttachmentType(fileType))
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    const packagePhoto = PackagePhoto.create({
      title: fileName,
      url,
    })

    await this.packagePhotoRepository.create(packagePhoto)

    return right({
      packagePhoto,
    })
  }
}
