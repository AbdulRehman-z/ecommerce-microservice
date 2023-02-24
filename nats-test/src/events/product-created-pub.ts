import { Publisher } from "./base-publisher";
import { Subjects } from "./subjects";
import { ProductCreatedEvent } from "./product-created-event";

class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  readonly subject = Subjects.ProductCreated;
}

export { ProductCreatedPublisher };
