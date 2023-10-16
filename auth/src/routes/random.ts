import express from 'express';
const router = express.Router();

router.get("/api/users/random",async(req,res)=>{
    console.log("Random API invoked");
    
    res.send({id: Math.random() * 10})
})

export {router as randomGenerator};