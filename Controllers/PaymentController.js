import catchAsyncError from "../middleware/catchAsyncError.js";
import Stripe from 'stripe'
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export const processPayment = catchAsyncError(async(req,res,next)=>{
    const myPayment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"usd",
        metadata:{
            company:"ShopApp"
        }

    })
    res.status(200).json({success:true, client_secret:myPayment.client_secret})

})

export const sendApiKey = catchAsyncError(async(req,res,next)=>{

    res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY})


})