import {
    GET_ALL_ORDERS_ADMIN_REQUEST,
    GET_ALL_ORDERS_ADMIN_SUCCESS,
    GET_ALL_ORDERS_ADMIN_FAIL,
} from '../Constants/OrderConstant.js';
import axios from 'axios';

export const getAllOrdersAdmin = () =>async(dispatch)=>{
    try {
        
        dispatch({type:GET_ALL_ORDERS_ADMIN_REQUEST})

        const {data} = await axios.get('/api/v1/order/allorders');

        dispatch({type:GET_ALL_ORDERS_ADMIN_SUCCESS, payload:data})

    } catch (error) {
  dispatch({type:GET_ALL_ORDERS_ADMIN_FAIL, payload: error.response.data.message})
        
    }
}