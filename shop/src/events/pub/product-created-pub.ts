import { ProductCreatedEvent, Publisher, Subjects } from "@abdulrehmanz/common";

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  readonly subject = Subjects.ProductCreated;
}
