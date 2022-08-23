import axios from "axios";

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  GET_ALL_PRODUCTS_ADMIN_REQUEST,
  GET_ALL_PRODUCTS_ADMIN_SUCCESS,
  GET_ALL_PRODUCTS_ADMIN_FAIL,
  REMOVE_PRODUCT_REQUEST,
  REMOVE_PRODUCT_FAIL,
  CREATE_NEW_PRODUCT_REQUEST,
  CREATE_NEW_PRODUCT_SUCCESS,
  CREATE_NEW_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../Constants/ProductConstant.js";

// Get All Products
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000],category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      
      if(category){
        link = `/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;

      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const getProductDetails = (id) => async (dispatch) => {
    try {
        
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/v1/product/${id}`);
       
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });

    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const addReview = (rating,comment,productId)=>async(dispatch)=>{
    try {

      console.log(rating,comment,productId);

      dispatch({type:NEW_REVIEW_REQUEST})

      const config = { headers: { "Content-Type": "application/json" } };

      const {data} = await axios.put('/api/v1/product/review',{rating:rating,comment:comment,productId:productId},config);

      dispatch({ type:NEW_REVIEW_SUCCESS,payload:data.message})
      
    } catch (error) {

      dispatch({ type:NEW_REVIEW_FAIL, payload:error.response.data.message})
      
    }
  }

  export const allReviews = (id)=>async(dispatch)=>{
    try {
      dispatch({type:ALL_REVIEW_REQUEST})

      const {data} = await axios.get(`/api/v1/product/reviews?id=${id}`)

      dispatch({type:ALL_REVIEW_SUCCESS,payload:data.reviews})
      
    } catch (error) {

      dispatch({ type:ALL_REVIEW_FAIL, payload:error.response.data.message})
      
    }
  }

  export const getAllProductsAdmin = ()=>async(dispatch)=>{
    try {

      dispatch({type:GET_ALL_PRODUCTS_ADMIN_REQUEST})

      const {data} = await axios.get('/api/v1/product/products')

      dispatch({type:GET_ALL_PRODUCTS_ADMIN_SUCCESS,payload:data.products})
      
    } catch (error) {

      dispatch({ type:GET_ALL_PRODUCTS_ADMIN_FAIL, payload:error.response.data.message})
      
    }
  }
  export const removeProductAdmin = (productId) => async(dispatch)=>{
    try {
      dispatch({type:REMOVE_PRODUCT_REQUEST})

      const {data} = await axios.delete(`/api/v1/product/${productId}`)

      dispatch({type:REMOVE_PRODUCT_REQUEST, payload:data})
      
    } catch (error) {

      dispatch({type:REMOVE_PRODUCT_FAIL, payload:error.response.data.message})

      
    }
  }

  export const createNewProduct = (productData) => async (dispatch) => {
    try {

        dispatch({ type: CREATE_NEW_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post(`/api/v1/product/new`, productData, config)

        dispatch({
            type: CREATE_NEW_PRODUCT_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: CREATE_NEW_PRODUCT_FAIL,
            payload: error
        })
    }
}
export const clearErrors = () => async (dispatch) => {
  dispatch({
      type: CLEAR_ERRORS
  })
}