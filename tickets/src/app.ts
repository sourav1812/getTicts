import express from 'express'
import "express-async-errors"
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFound } from '@ss_microservice_auth_service/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';

const app = express();
app.set('trust proxy',true)
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);

app.all("*",()=>{
    throw new NotFound()
})

app.use(errorHandler)

export default app;


