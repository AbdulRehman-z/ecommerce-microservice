import {
  Publisher,
  Subjects,
  ExpirationTimeCompletedEvent,
} from "@abdulrehmanz/common";

export class ExpirationTimeCompletedPublisher extends Publisher<ExpirationTimeCompletedEvent> {
  readonly subject = Subjects.ExpirationTimeCompleted;
}
