import { Publisher,Subjects, TicketCreatedEvent } from "@ss_microservice_auth_service/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated;
}
