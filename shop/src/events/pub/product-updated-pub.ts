import { ProductUpdatedEvent, Publisher, Subjects } from "@abdulrehmanz/common";

export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
  readonly subject = Subjects.ProductUpdated;
}
