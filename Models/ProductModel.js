import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
     name:{
        type:String,
        required:[true,"Please enter Product Name"],
        trim:true,
        maxlength:[100,"Product name cannot exceed 100 characters"]
    },
    price:{
        type:Number,
        required:[true,"Please enter Product Price"],
        maxlength:[5,"Product Price cannot exceed 99999"],
        default:0.0
    },
    description:{
        type:String,
        required:[true,"Please enter Product Description"]
    },
    ratings:{
        type:Number,
        default:0.0,
    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter Product Category"],
        enum:{
            values:[
                'Casual',
                'Winter',
                'Summer',
                'Bottom',
                'Top'
            ],
            message:"Please select correct category for your Product"
        }
    },
    seller:{
        type:String,
        required:[true,"Please enter Product Seller"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter Product Stock"],
        maxlength:[5,"Product Stock Cannot exceed 99999"],
        default:0
    },
    noOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true,

            }, user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }


})
export default mongoose.model("Product",productSchema)