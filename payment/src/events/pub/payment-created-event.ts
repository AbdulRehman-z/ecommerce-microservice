import { Subjects, PaymentCreatedEvent, Publisher } from "@abdulrehmanz/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
