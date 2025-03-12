import { UploadAndCreatePackagePhotoUseCase } from './upload-and-create-package-photo'
import { FakeUploader } from 'test/storage/faker-uploader'
import { InMemoryPackagePhotoRepository } from 'test/repositories/in-memory-package-photo-repository'
import { InvalidAttachmentType } from './errors/invalid-image-type'

let inMemoryPackagePhotoRepository: InMemoryPackagePhotoRepository
let fakeUploader: FakeUploader

let sut: UploadAndCreatePackagePhotoUseCase

describe('Upload and create package image', () => {
  beforeEach(() => {
    inMemoryPackagePhotoRepository = new InMemoryPackagePhotoRepository()

    fakeUploader = new FakeUploader()

    sut = new UploadAndCreatePackagePhotoUseCase(
      inMemoryPackagePhotoRepository,
      fakeUploader,
    )
  })

  it('should be able to upload and create an package photo', async () => {
    const result = await sut.execute({
      fileName: 'profile.png',
      fileType: 'image/png',
      body: Buffer.from(''),
      packageId: '84545dc4dxsx',
    })

    expect(result.isRight()).toBe(true)

    expect(result.value).toEqual({
      packagePhoto: inMemoryPackagePhotoRepository.items[0],
    })

    expect(fakeUploader.uploads).toHaveLength(1)
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'profile.png',
      }),
    )
  })

  it('should not be able to upload an package photo with invalid file type', async () => {
    const result = await sut.execute({
      fileName: 'profile.mp3',
      fileType: 'audio/mpeg',
      body: Buffer.from(''),
      packageId: '8c4d8c48c4x5sx4s5x',
    })

    expect(result.isLeft()).toBe(true)

    expect(result.value).toBeInstanceOf(InvalidAttachmentType)
  })
})
