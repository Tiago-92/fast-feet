export abstract class DeliveredDriverRepository {
  abstract delete(id: string): Promise<void>
}
