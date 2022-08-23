import User from '../Models/UserModel.js';
import jwt from 'jsonwebtoken'
import catchAsyncError from '../middleware/catchAsyncError.js';
import ErrorHandler from '../utils/errorHandler.js'

export const isAuthenticated = catchAsyncError(async(req,res,next) => {

    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("You are not allowed to access this resource",401))
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
     
    req.user = await User.findById(decoded.id)

    next()
})

export const authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`,403));
        }
        next()
    }
}
