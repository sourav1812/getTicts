import express from 'express'
import "express-async-errors"
import mongoose from 'mongoose'
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFound } from './errors/not-found';

const app = express();
app.set('trust proxy',true)
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: true
}))

app.use(currentUserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)

app.all("*",()=>{
    throw new NotFound()
})

app.use(errorHandler)

const start = async () => {
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
        console.log("Connected to mongoDB");
        
    } catch (error) {
        console.log(error);
    }

    app.listen(5001,()=>{
        console.log("Listening on port 5001!!");
    })
}

start();