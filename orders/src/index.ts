import mongoose from 'mongoose'
import app from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error("JWT_KEY is missing");
    }

    if(!process.env.MONGO_URI){
        throw new Error("MONGO_URL is missing");
    }

    if(!process.env.NATS_CLUSTER_ID){
        throw new Error("NATS_CLUSTER_ID is missing");
    }

    if(!process.env.NATS_URI){
        throw new Error("NATS_URI is missing");
    }

    if(!process.env.NATS_CLIENT_ID){
        throw new Error("NATS_CLIENT_ID is missing");
    }

    try {
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URI);

        natsWrapper.client.on('close',()=>{
            console.log("nats connection closed"!);
    
            process.exit();
        })

        process.on('SIGINT',()=>natsWrapper.client.close())
        process.on('SIGTERM',()=>natsWrapper.client.close())

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongoDB");
        
    } catch (error) {
        console.log(error);
    }

    app.listen(3001,()=>{
        console.log("Running on port 3001!!  !");
    })
}

start();