import { Publisher } from "../../../common/src/events/base-pub";
import { Subjects } from "../../../common/src/events/subjects";
import { ProductCreatedEvent } from "../../../common/src/events/product-created-event";

class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  readonly subject = Subjects.ProductCreated;
}

export { ProductCreatedPublisher };
