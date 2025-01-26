import { Injectable } from '@nestjs/common'
import { PackageRepository } from '../package/application/repositories/package-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { right } from '@/core/either'
import { DeliveredDriverRepository } from '../package/application/repositories/delivered-driver-repository'

@Injectable()
export class ListDeliveryAddressForDeliveredDriverUseCase {
  constructor(
    private packageRepository: PackageRepository,
    private delivererRepository: DeliveredDriverRepository,
  ) {}

  async execute({ delivererId }: { delivererId: string }) {
    const delivererLocation =
      await this.delivererRepository.getDelivererLocation(delivererId)
    if (!delivererLocation) {
      throw new Error('Entregador não encontrado ou sem localização.')
    }

    const { latitude: delivererLatitude, longitude: delivererLongitude } =
      delivererLocation
    const packages = await this.packageRepository.findAll()

    const deliveriesWithNumbers = packages.map((delivery) => ({
      ...delivery,
      latitude: parseFloat(delivery.latitude),
      longitude: parseFloat(delivery.longitude),
      distance: getDistanceBetweenCoordinates(
        { latitude: delivererLatitude, longitude: delivererLongitude },
        {
          latitude: parseFloat(delivery.latitude),
          longitude: parseFloat(delivery.longitude),
        },
      ),
    }))

    const sortedPackages = deliveriesWithNumbers.sort(
      (a, b) => a.distance - b.distance,
    )

    return right({
      packages: sortedPackages,
    })
  }
}
