import express from 'express'
import "express-async-errors"
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFound } from '@ss_microservice_auth_service/common';
import { randomGenerator } from './routes/random';

const app = express();
app.set('trust proxy',true)
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))

app.use(currentUserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(randomGenerator)

app.all("*",()=>{
    throw new NotFound()
})

app.use(errorHandler)

export default app;