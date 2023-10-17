import express from 'express';
import { currentUser } from '../middlewares/currentUser';
const router = express.Router();

router.get('/api/users/currentUser',currentUser,(req,res)=>{
    console.log("/api/users/currentUser");
    
    res.send({currentUser: req.currentUser ||  null})
});

export {router as currentUserRouter};