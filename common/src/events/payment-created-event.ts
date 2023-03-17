import { Subjects } from "./subjects";

interface PaymentCreatedEvent {
  subject: Subjects.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}

export { PaymentCreatedEvent };
