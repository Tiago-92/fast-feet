import { Package } from "../entities/package";

export interface PackageRepository {
  create(packageContent: Package): Promise<void>
}