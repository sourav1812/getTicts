
import express, { Request, Response } from 'express';
import { NotFound } from "@ss_microservice_auth_service/common";
// import { Ticket } from '../models/orders';

const router = express.Router();

router.get('/api/orders', async (req: Request, res: Response) => {
//   const order = await Ticket.find({});

  res.send({});
});

export { router as showAllOrders };
