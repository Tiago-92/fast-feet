import { UploadAndCreatePackagePhotoUseCase } from '@/domain/use-cases/upload-and-create-package-photo'
import { InvalidAttachmentTypeError } from '@/domain/use-cases/errors/invalid-image-type'
import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Param,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('/package/image')
export class UploadPackageImageController {
  constructor(
    private uploadAndCreatePackagePhotoUseCase: UploadAndCreatePackagePhotoUseCase,
  ) {}

  @Post(':packageId')
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @Param('packageId') packageId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // 2mb
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.uploadAndCreatePackagePhotoUseCase.execute({
      fileName: file.originalname,
      fileType: file.mimetype,
      body: file.buffer,
      packageId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case InvalidAttachmentTypeError:
          throw new BadRequestException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }

    const { packagePhoto } = result.value

    return {
      packagePhotoId: packagePhoto.id.toString(),
    }
  }
}
