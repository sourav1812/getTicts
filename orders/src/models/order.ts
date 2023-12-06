import mongoose, { Schema, Types } from 'mongoose';
import { OrderStatus } from '@ss_microservice_auth_service/common';
import { TicketDoc } from './ticket';

export { OrderStatus };

interface OrderAttrs {
  status: OrderStatus;
  expiresAt: Date;
  userId: string;
  ticket: TicketDoc;
}

interface OrderDoc extends mongoose.Document {
    status: OrderStatus;
    expiresAt: Date;
    userId: string;
    ticket: TicketDoc;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      required: true,
      default: OrderStatus.Created
    },
    expiresAt: {
      type: Schema.Types.Date
    },
    userId: {
      type: String,
      required: true,
    },
    ticket:{
        type: Schema.Types.ObjectId,
        ref: 'Ticket' 
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
