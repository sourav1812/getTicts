import express from 'express'
import "express-async-errors"
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFound } from '@ss_microservice_auth_service/common';
import { createOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { showAllOrders } from './routes';
import { deleteOrderRouter } from './routes/delete';

const app = express();
app.set('trust proxy',true)
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))

app.use(currentUser);

app.use(createOrderRouter);
app.use(showOrderRouter);
app.use(showAllOrders);
app.use(deleteOrderRouter);

app.all("*",()=>{
    throw new NotFound()
})

app.use(errorHandler)

export default app;


