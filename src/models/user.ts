import {Schema,Document,model} from "mongoose";
import bcrypt from "bcrypt";


export interface IUser  extends Document{
    email:string;
    password:string;
    comparePasswordUser: (password: string) => Promise<Boolean>
}

const userSchema =new Schema<IUser>({
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String
    },
    identification:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    firstName:{
        type:String,
        required:true,
        uppercase:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        uppercase:true,
        trim:true
    }
    
});
userSchema.pre<IUser>("save", async function(next) {
    const user = this;
  
    if (!user.isModified("password")) return next();
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  
    next();
  });
  
userSchema.methods.comparePasswordUser = async function(
    password: string
  ): Promise<Boolean> {
    console.log(password)
    console.log(this.password)
    return await bcrypt.compare(password,this.password);
  };

export default model<IUser>('User',userSchema);