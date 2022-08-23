import Product from "../Models/ProductModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import Order from "../Models/OrderModel.js";

//create order
export const createOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;
    
      const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
      });
    
      res.status(201).json({
        success: true,
        order,
      });
});

//get single orderItems

export const getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user','name email')
    
    if(!order){
        return next(new ErrorHandler("No order found",404))
    }

    res.status(200).json({success:true,order})
})

//logged in user orderItems

export const myOrders = catchAsyncError(async (req, res, next) => {

    const order = await Order.find({user:req.user._id})
    

    res.status(200).json({success:true,order})
})

//get all products

export const getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;
    orders.forEach(order=>(
        totalAmount += order.totalPrice
    )
 )

    res.status(200).json({success:true,totalAmount,orders}
        )
})

export const updateOrderStatus = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id)

    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler("Order is already delivered",400))
    }

    order.orderItems.forEach(async (item) => {
        await updateStock(item.product,item.quantity)
    })

    order.orderStatus = req.body.status;

   if(req.body.status === 'Delivered'){
    order.deliverdAt = Date.now();
   }

   await order.save({validateBeforeSave:false})

   res.status(200).json({success:true,order})


})

async function updateStock(id,quantity){
   const product = await Product.findById(id)

   product.stock = product.stock - quantity

   await product.save({validateBeforeSave:false})
}

export const deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler("Order not found",404))
    }

    await order.remove()

    res.status(200).json({success:true,message:"Order removed successfully"})
})