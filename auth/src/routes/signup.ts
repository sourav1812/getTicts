import express,{Request,Response} from 'express';
import { body,validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation';
import { User } from '../models/user';
import { BadRequest } from '../errors/bad-request';

const router = express.Router();

router.post('/api/users/signup',[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({min: 4,max: 20}).withMessage('Password must be b/w 4 to 20')
],async (req: Request,res: Response)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        // return res.status(400).send(errors.array());
        throw new RequestValidationError(errors.array());
    }

    const {email,password} = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        // return res.send({});
        throw new BadRequest("Email is already is use");
    }

    const user = User.build({
        email,
        password
    })

    await user.save();

    res.send(user)

});

export {router as signupRouter};