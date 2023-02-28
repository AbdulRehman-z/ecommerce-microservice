import { Publisher } from "./base-publisher";
import { ProductCreatedEvent } from "./product-created-event";
import { Subjects } from "./subjects";

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  readonly subject = Subjects.ProductCreated;
}
