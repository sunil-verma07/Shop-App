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
    CLEAR_ERRORS,
    GET_ALL_PRODUCTS_ADMIN_REQUEST,
    GET_ALL_PRODUCTS_ADMIN_SUCCESS,
    GET_ALL_PRODUCTS_ADMIN_FAIL,
    REMOVE_PRODUCT_REQUEST,
    REMOVE_PRODUCT_SUCCESS,
    REMOVE_PRODUCT_FAIL,
    CREATE_NEW_PRODUCT_REQUEST,
    CREATE_NEW_PRODUCT_SUCCESS,
    CREATE_NEW_PRODUCT_FAIL,
    CREATE_NEW_PRODUCT_RESET,
  } from "../Constants/ProductConstant.js";
  
  export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case GET_ALL_PRODUCTS_ADMIN_REQUEST:
      case ALL_PRODUCT_REQUEST:
        return {
          loading: true,
          products: [],
        };
      case ALL_PRODUCT_SUCCESS:
        return {
          loading: false,
          products: action.payload.products,
          productsCount: action.payload.productsCount,
          resultPerPage: action.payload.resultPerPage,
        };
      case GET_ALL_PRODUCTS_ADMIN_SUCCESS:
        return{
          loading: false,
          products:action.payload
        }
     
      case ALL_PRODUCT_FAIL:
      case GET_ALL_PRODUCTS_ADMIN_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
    
  export const productDetailsReducer = (state = { productDetail: {} }, action) => {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case PRODUCT_DETAILS_SUCCESS:
        return {
          loading: false,
          productDetail: action.payload,
        };
      case PRODUCT_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
        
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  export const reviewReducer = (state={message:{}}, action) =>{
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
      case REMOVE_PRODUCT_REQUEST:
        return{
          isLoading: true,
        }
      case NEW_REVIEW_SUCCESS:
      case REMOVE_PRODUCT_SUCCESS:
        return{
          isLoading: false,
          message: action.payload
        }

      case NEW_REVIEW_FAIL:
      case REMOVE_PRODUCT_FAIL:
        return{
          isLoading: false,
          error: action.payload,
        } 
        case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  }
  export const allReviewsReducer = (state={reviews:[]}, action) =>{
    switch (action.type) {
      case ALL_REVIEW_REQUEST:
        return{
          isLoading: true,
        }
      case ALL_REVIEW_SUCCESS:
        return{
          isLoading:false,
          reviews: action.payload
        }
      case ALL_REVIEW_FAIL:
        return{
          isLoading: false,
          error: action.payload,
        } 
        case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  }
  export const createNewProductReducer = (state={product:{}}, action) =>{
    switch (action.type) {
      case CREATE_NEW_PRODUCT_REQUEST:
        return{
          isLoading: true,
        }
      case CREATE_NEW_PRODUCT_SUCCESS:
        return{
          isLoading: false,
          message: action.payload
        }

      case CREATE_NEW_PRODUCT_FAIL:
        return{
          isLoading: false,
          error: action.payload,
        } 
        case CREATE_NEW_PRODUCT_RESET:
          return {
              ...state,
              success: false
          }
        case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  }