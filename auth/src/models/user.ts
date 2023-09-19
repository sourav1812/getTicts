import { Model, Schema,model,Document } from "mongoose";
import { Password } from "../services/password"; 

interface UserAttrs{
    email: string,
    password: string
}

interface UserModal extends Model<UserDoc>{
    build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends Document{
    email: string;
    password: string
}

const UserSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

UserSchema.pre('save',async function(done){
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'))
        this.set('password',hashed);
    }

    done();
})

UserSchema.statics.build = (attrs: UserAttrs)=>{
    return new User(attrs)
}

const User = model<UserDoc,UserModal>('User',UserSchema);

export { User };