import { Injectable } from '@nestjs/common'
import { PackageRepository } from '../package/application/repositories/package-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

@Injectable()
export class ListDeliveryAddressForDeliveredDriver {
  constructor(private packageRepository: PackageRepository) {}

  async execute(
    currentLatitude: number,
    currentLongitude: number,
    radius: number,
  ) {
    const packages = await this.packageRepository.findAll()

    const deliveriesWithNumbers = packages.map((delivery) => ({
      ...delivery,
      latitude: parseFloat(delivery.latitude),
      longitude: parseFloat(delivery.longitude),
    }))

    const nearbyPackages = deliveriesWithNumbers.filter((delivery) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: currentLatitude, longitude: currentLongitude },
        { latitude: delivery.latitude, longitude: delivery.longitude },
      )
      return distance <= radius
    })

    return nearbyPackages
  }
}
