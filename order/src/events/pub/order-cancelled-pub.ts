import { OrderCancelledEvent, Publisher, Subjects } from "@abdulrehmanz/common";

export class OrderCancelLedPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
