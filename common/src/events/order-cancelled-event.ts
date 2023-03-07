import { Subjects } from "./subjects";

interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled;
  data: {
    id: string;
    version: number;

    product: {
      id: string;
    };
  };
}

export { OrderCancelledEvent };
