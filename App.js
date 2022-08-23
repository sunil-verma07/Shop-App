import express from 'express'
const app = express();
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRouter from './Routes/ProductRoute.js'
import userRouter from './Routes/UserRoute.js'
import OrderRouter from './Routes/OrderRoute.js'
import PaymentRouter from './Routes/PaymentRoute.js'
import errorMiddleware from './middleware/error.js'
import cookieparser from 'cookie-parser'
import cloudinary from 'cloudinary'
import bodyparser from 'body-parser'
import path from 'path'
import cors from 'cors'
import {fileURLToPath} from 'url';
import fileUpload from "express-fileupload"

process.on('uncaughtException',err=>{
    console.log(`Error:${err.message}`);
    console.log('Shutting down the server')
   
        process.exit(1)
    
})


app.use(express.json())

dotenv.config()

app.use(bodyparser.urlencoded({ extended:true}))
app.use(cookieparser())
app.use(fileUpload());
app.use(cors())

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_SECRET_KEY
})

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Connected to Database')
}).catch((err)=>{
    console.log(err)
})
app.use("/api/v1/order",OrderRouter)
app.use("/api/v1/product",productRouter);
app.use("/api/v1/user",userRouter)
app.use("/api/v1/payment",PaymentRouter)


app.use(errorMiddleware);

const __dirname2 = path.resolve()


app.use(express.static(path.join(__dirname2, "frontend/build")));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname2, 'frontend','build',         
  'index.html'));
});


var port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})

process.on('unhandledRejection',err=>{
    console.log(`Error:${err.message}`);
    console.log('Shutting down the server')
    server.close(()=>{
        process.exit(1)
    })
})