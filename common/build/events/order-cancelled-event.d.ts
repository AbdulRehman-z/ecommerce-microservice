import { Subjects } from "./subjects";
interface OrderCancelledEvent {
    subject: Subjects.OrderCancelled;
    data: {
        id: string;
        product: {
            id: string;
        };
    };
}
export { OrderCancelledEvent };
