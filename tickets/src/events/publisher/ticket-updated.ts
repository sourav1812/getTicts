import { Publisher,Subjects, TicketUpdatedEvent } from "@ss_microservice_auth_service/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated;
}
