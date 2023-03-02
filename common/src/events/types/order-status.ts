enum OrderStatus {
  // When the order has been created,but the product has not been reserved
  Created = "created",
  // The product has been reserved, but the user has not paid for it yet
  // The order expires before payment
  Cancelled = "cancelled",
  // The order has successfully reserved the product
  AwaitingPayment = "awaiting:payment",
  // The order has reserved the product and the user has paid
  Complete = "complete",
}

export { OrderStatus };
