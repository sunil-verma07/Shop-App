import Product from '../Models/ProductModel.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncError from '../middleware/catchAsyncError.js'
import APIFeatures from '../utils/apiFeatures.js'
import cloudinary from 'cloudinary'

//create Product
export const createProduct = catchAsyncError(async (req, res, next) => {

  let images=[]
  if (typeof req.body.images === 'string') {
      images.push(req.body.images)
  } else {
      images = req.body.images
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: 'products'
      });

      imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url
      })
  }

  req.body.images = imagesLinks
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
      success: true,
      product
  })
})

export const getAllProductsAdmin = catchAsyncError( async(req,res,next)=>{
 
  const products = await Product.find()

  if(!products){
    return next(new ErrorHandler("No products found",404))
}

  res.status(200).json({success:true,products})
})


//get all products
export const getAllProducts = catchAsyncError( async(req,res,next)=>{

    const resultPerPage = 12;
    const productsCount = await Product.countDocuments();

   const apiFeatures = new APIFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)

   let products = await apiFeatures.query;
  
    res.status(201).json({success: true,productsCount,products,resultPerPage})
})


//bet product by id
export const getProductById =catchAsyncError( async(req,res,next)=>{

    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(201).json({success: true,product})
}
)

//update product
export const updateProduct =catchAsyncError( async(req,res,next)=>{

    const product = await Product.findById(req.params.id)

   if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:true,
    })

    res.status(201).json({success:true,updatedProduct})


})

//delete Product 
export const deleteProduct =catchAsyncError( async(req,res,next)=>{

    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    await product.remove()

    res.status(201).json({success: true,message:"Product Removes Successfully"})

})

export const reviwProduct = catchAsyncError( async(req,res,next)=>{

    const {rating,comment,productId} = req.body;

    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }

    const product = await Product.findById(productId)

   
        product.reviews.push(review)
        product.noOfReviews = product.reviews.length
     

    let average = 0;
    product.reviews.forEach(rev=> { average += rev.rating})

    product.ratings = average /product.reviews.length;

    await product.save({validateBeforeSave:false})

    res.status(200).json({success: true, message:"Review added",product})

})

export const getReviewsById = catchAsyncError( async(req,res,next)=>{
    const product = await Product.findById(req.query.id)

    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    
    res.status(200).json({success:true,reviews:product.reviews})

})

export const deleteReview = catchAsyncError( async(req,res,next)=>{

    const product = await Product.findById(req.query.productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });
    