import { Subjects } from "./subjects";
interface OrderCreatedEvent {
    subject: Subjects.OrderCreated;
    data: {
        id: string;
        status: string;
        userId: string;
        expiresAt: string;
        product: {
            id: string;
            price: number;
        };
    };
}
export { OrderCreatedEvent };
