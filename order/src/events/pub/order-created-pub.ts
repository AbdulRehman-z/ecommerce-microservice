import { OrderCreatedEvent, Publisher, Subjects } from "@abdulrehmanz/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
