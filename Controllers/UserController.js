import User from '../Models/UserModel.js';
import ErrorHandler from '../utils/errorHandler.js'; 
import catchAsyncError from '../middleware/catchAsyncError.js'
import sendToken from '../utils/jwtToken.js'
import crypto from 'crypto';



export const registration = catchAsyncError(async(req,res,next) => {
    const {name,email,password}= req.body;

 
    const user = await User.create({
        name:name,
        email:email,
        password:password,
       })
        
        sendToken(user,200,res)
})

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
  
    // checking if user has given password and email both
  
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    sendToken(user, 200, res);
  });
  

export const logout = catchAsyncError(async(req,res,next)=>{
    res.cookie('token',null,{
       expires:new Date(Date.now())
    })

    res.status(200).json({success:true,
    message:"Logout successfully"})
})

export const forgotPassword = catchAsyncError(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email})

    if(!user){
        return next(new ErrorHandler("User not Found",404))
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/user/password/reset/${resetToken}`;

    const resetPasswordMessage = `Your reset password token is \n\n ${resetPasswordUrl} \n\n If you have not requested for reset password, Please ignore this email`;

    try {

        await sendEmail({
            email:user.email,
            subject:'ShopApp Password Recovery',
            message:resetPasswordMessage
        })

        res.status(200).json({success:true, message:`Email has been sent to ${user.email}`})
        
    } catch (error) {

        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500))
        
    }
})

export const resetPassword = catchAsyncError(async(req,res,next) =>{

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    
    if(!user){
        return next(new ErrorHandler("Password reset token is Invalid or Expired"))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password didn't match"))
    }
    user.password = req.body.password;


    await user.save()
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    res.status(200).json({success:true,message:"Password has been changed successfully"})
})

export const getUserProfile = catchAsyncError(async(req,res,next) =>{
    const user = await User.findById(req.user.id);

    if(!user){
        return next(new ErrorHandler("User not found",404))
    }

    res.status(200).json({success:true,
    user})
})

export const updatePassword = catchAsyncError(async(req,res,next) =>{

    const user = await User.findById(req.user.id).select('+password');

    const isMatched = await user.comparePassword(req.body.oldPassword)

    if(!isMatched){
        return next(new ErrorHandler("Old Password is Incorrect"))
    }
    user.password =await req.body.newPassword;
   
    await user.save()

    res.status(200).json({success:true,message:"Password Updated"})
})

export const updateProfile = catchAsyncError(async(req,res,next) =>{

    const user = await User.findByIdAndUpdate(req.user.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:true,
    })

   const updatedUser = await user.save()

   res.status(200).json({success:true,updatedUser})

})

export const getAllUserAdmin = catchAsyncError(async(req,res,next) =>{

    const users = await User.find()

    if(!users){
        return next(new ErrorHandler("No user found",404))
    }

    res.status(200).json({success:true,count:users.length,users})
})

export const getUserAdmin = catchAsyncError(async(req,res,next) =>{

    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler("No user found",404))
    }

    res.status(200).json({success:true,user})
})

export const updateUserAdmin = catchAsyncError(async(req,res,next) =>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }


    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:true    })

    if(!user){
        return next(new ErrorHandler("User not Found",404))
    }
    res.status(200).json({success:true,user})
})

export const removeUserAdmin = catchAsyncError(async(req,res,next) =>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler("User not Found",404))
    }

    user.remove();

    res.status(200).json({success:true,message:"User Removed"})
    
})