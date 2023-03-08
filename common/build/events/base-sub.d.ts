import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";
interface Event {
    subject: Subjects;
    data: any;
}
declare abstract class Subscriber<T extends Event> {
    abstract subject: T["subject"];
    abstract queueGroupName: string;
    abstract onMessage(data: T["data"], msg: Message): void;
    protected ackWait: number;
    protected client: Stan;
    constructor(client: Stan);
    subscriptionOptions(): import("node-nats-streaming").SubscriptionOptions;
    listen(): void;
    parseMessage(msg: Message): any;
}
export { Subscriber };
