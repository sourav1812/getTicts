
import { NotAuthorizedError, NotFound, requireAuth } from '@ss_microservice_auth_service/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';
const router = express.Router();

router.get('/api/order/:orderId',requireAuth, async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');
    if(!order) throw new NotFound();
    if(order.userId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }

    res.status(200).send(order)
});

export { router as showOrderRouter };
