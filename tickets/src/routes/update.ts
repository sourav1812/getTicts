import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFound, RequestValidator, requireAuth } from "@ss_microservice_auth_service/common";
import { Ticket } from '../models/ticket';
import { body } from 'express-validator';

const router = express.Router();

router.put('/api/tickets/:id',  requireAuth,[
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than 0'),
], RequestValidator, async (req: Request, res: Response) => {
  const { title,price } = req.body;
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFound();
  }

  if(ticket.userId !== req.currentUser!.id){
    throw new NotAuthorizedError()
  }

  ticket.set({
    title,
    price
  })
  await ticket.save()

  res.send(ticket);
});

export { router as updateTicketRouter };
