import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { RequestValidator } from '../middlewares/requestValidator';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { BadRequest } from '../errors/bad-request';
import { Password } from '../services/password';

const router = express.Router();

router.post('/api/users/signin',[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty()
    .withMessage('You must supply a password')
],RequestValidator,async (req: Request,res: Response)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email})

    if(!user){
        throw new BadRequest("Email or password is incorrect")
    }

    const passwordMatch = await Password.compare(user.password,password);

    if(!passwordMatch){
        throw new BadRequest("Email or password is incorrect")
    }
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    },process.env.JWT_KEY!)

    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user)

});

export {router as signinRouter};