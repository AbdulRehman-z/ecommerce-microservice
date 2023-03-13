import { Subjects } from "./subjects";
import { OrderStatus } from "./types/order-status";
interface OrderCreatedEvent {
    subject: Subjects.OrderCreated;
    data: {
        id: string;
        status: OrderStatus;
        userId: string;
        version: number;
        expiresAt: string;
        product: {
            id: string;
            price: number;
        };
    };
}
export { OrderCreatedEvent };
