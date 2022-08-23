import mongoose from 'mongoose';
import validator from 'validator'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your Name"],
        maxLength:[30,"Name should not exceed 30 characters"],
        minlength:[4,"Name should have atleast 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your Email"],
        unique:true,
        validate:[validator.isEmail,"Pkease enter a valid email"]
    },
    password:{
        type:String,
        minlength:[8,"Password should be at least 8 characters"],
        select:false,
        required:[true,"Please enter your Password"]
    },
   
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})
//hash password
userSchema.pre('save',async function (next) {
    if(!this.isModified('password')) {
       next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

//compare password
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

//jwt token
userSchema.methods.getJwtToken= function () {

    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRATION
    })

}

userSchema.methods.getResetPasswordToken = function () {

    const resetToken =crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.resetPasswordExpire= Date.now() + 30*60*1000;

    return resetToken
}

export default mongoose.model("User",userSchema)