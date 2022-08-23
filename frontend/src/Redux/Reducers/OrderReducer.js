import {
    GET_ALL_ORDERS_ADMIN_REQUEST,
    GET_ALL_ORDERS_ADMIN_SUCCESS,
    GET_ALL_ORDERS_ADMIN_FAIL,
} from '../Constants/OrderConstant.js';

export const orderReducer = (state={orders:[]},action) =>{
    switch (action.type) {
        case GET_ALL_ORDERS_ADMIN_REQUEST:
            return{
                loading: true,
                orders:[]
            }
        case GET_ALL_ORDERS_ADMIN_SUCCESS:
            return{
                ...state,
                loading: false,
                orders: action.payload.orders
            }
        case GET_ALL_ORDERS_ADMIN_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }
        
        default:
            return state;
    }
}