
import { NotAuthorizedError, NotFound, OrderStatus, requireAuth } from '@ss_microservice_auth_service/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';
const router = express.Router();

router.delete('/api/order/:id',requireAuth, async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id)

    if(!order) throw new NotFound();
    if(order.userId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    //publish an event saying this was cancelled
    
    res.status(204).send(order)
});

export { router as deleteOrderRouter };
