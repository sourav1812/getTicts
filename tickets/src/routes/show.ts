import express, { Request, Response } from 'express';
import { NotFound } from "@ss_microservice_auth_service/common";
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFound();
  }

  res.send(ticket);
});

export { router as showTicketRouter };
