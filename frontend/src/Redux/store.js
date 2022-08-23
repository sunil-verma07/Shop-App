import { configureStore } from "@reduxjs/toolkit";
import{allReviewsReducer, createNewProductReducer, productDetailsReducer,productsReducer , reviewReducer} from './Reducers/ProductReducer.js'
import {authReducer, getAllUsersReducer, getUserDetailReducer, updateReducer, updateUserReducer} from './Reducers/UserReducer.js'
import {cartReducer} from './Reducers/CartReducer.js'
import { orderReducer } from "./Reducers/OrderReducer.js";

const initialState={
  cart:{
    cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  
  shippingInfo:localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : [],}
}

const store = configureStore({
  reducer: {
    product:productsReducer,
    productDetails:productDetailsReducer,
    productReview:reviewReducer,
    getProductReviews:allReviewsReducer,
    createProduct:createNewProductReducer,

    auth:authReducer,
    updateProfile:updateReducer,
    getAllUsersReducer:getAllUsersReducer,
    userDetail:getUserDetailReducer,
    updateUserAdminReducer:updateUserReducer,

    cart:cartReducer,

    order:orderReducer
  },
  preloadedState:initialState,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false
  }),
});

export default store;
