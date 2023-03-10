import { Subjects } from "./subjects";
export interface ExpirationTimeCompletedEvent {
    subject: Subjects.ExpirationTimeCompleted;
    data: {
        orderId: string;
    };
}
