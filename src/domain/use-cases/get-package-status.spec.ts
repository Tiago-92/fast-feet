import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repositoy'
import { GetStatusUseCase } from './get-package-status'
import { PackageStatus } from '@prisma/client'
import { Right } from '@/core/either'

let inMemoryPackageRepository: InMemoryPackageRepository
let sut: GetStatusUseCase

describe('Get Package Status Use Case', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    sut = new GetStatusUseCase(inMemoryPackageRepository)
  })

  it('should be able to list an all package status', async () => {
    const result = await sut.execute()

    const rightResult = result as Right<unknown, { status: PackageStatus[] }>

    expect(rightResult.value.status).toEqual(Object.values(PackageStatus))
    expect(rightResult.value.status.length).toBe(
      Object.keys(PackageStatus).length,
    )
  })
})
