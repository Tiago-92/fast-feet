interface OrderUseCaseRequest {
  deliveryDriverId: string
  orderId: string
}

export class OrderUseCase {
  execute({ deliveryDriverId, orderId }: OrderUseCaseRequest) {

  }
}

new OrderUseCase().execute({
  deliveryDriverId: '1',
  orderId: '1',
})