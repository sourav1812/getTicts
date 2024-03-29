import mongoose from 'mongoose'
import app from './app';

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error("JWT_KEY is missing");
    }
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