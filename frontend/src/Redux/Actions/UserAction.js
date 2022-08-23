import axios from 'axios'

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAIL,
    REMOVE_USER_REQUEST,
    REMOVE_USER_SUCCESS,
    REMOVE_USER_FAIL,
    UPDATE_USER_REQUEST_ADMIN,
    UPDATE_USER_SUCCESS_ADMIN,
    UPDATE_USER_FAIL_ADMIN,
    GET_USER_DETAIL_REQUEST,
    GET_USER_DETAIL_SUCCESS,
    GET_USER_DETAIL_FAIL,
    
  } from '../Constants/UserConstant.js'

    export const login = (email, password) => async (dispatch) => {
        try {
          dispatch({ type: LOGIN_REQUEST });
      
          const config = { headers: { "Content-Type": "application/json" } };
      
          const {data} = await axios.post(
            `/api/v1/user/login`,
            { email, password },
            config
          );
          
          dispatch({ type: LOGIN_SUCCESS, payload:data});
        } catch (error) {
          dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
        }
      };

      export const register = (name,email,password) =>async(dispatch)=>{
        try {
          dispatch({ type:REGISTER_REQUEST});
          const config = { headers: { "Content-Type": "application/json" } };

          const {data} = await axios.post('/api/v1/user/register',{name,email,password},config);

          dispatch({ type:REGISTER_SUCCESS, payload:data})
          
        } catch (error) {
          dispatch({type: REGISTER_FAIL, payload: error.response.data.message})
          
        }
      }

    export const loadUser = ()=>async(dispatch)=>{
        try {
          dispatch({type:LOAD_USER_REQUEST})

          const {data} = await axios.get('/api/v1/user/profile')

          dispatch({ type:LOAD_USER_SUCCESS, payload:data.user})
          
        } catch (error) {
          dispatch({type:LOAD_USER_FAIL, payload:error.response.data.message})
        }
      }

    export const logout = ()=>async(dispatch)=>{

      try {
        await axios.get('/api/v1/user/logout')

        dispatch({type:LOGOUT_SUCCESS})
        
      } catch (error) {
        dispatch({type:LOGOUT_FAIL, payload:error.response.data.message})
      }
    }

      export const clearErrors = ()=>(dispatch)=>{
        dispatch({ type:CLEAR_ERRORS})
      }

      export const updateProfile = (name,email) =>async(dispatch)=>{
        try {
          dispatch({ type:UPDATE_USER_REQUEST});
          const config = { headers: { "Content-Type": "application/json" } };

          const {data} = await axios.put('/api/v1/user/update',{name,email},config);

          dispatch({ type:UPDATE_USER_SUCCESS, payload:data})
          
        } catch (error) {
          dispatch({type: UPDATE_USER_FAIL, payload: error.response.data.message})
          
        }
      }
      export const updatePassword = (oldPassword,newPassword) =>async(dispatch)=>{
        try {
          dispatch({ type:UPDATE_PASSWORD_REQUEST});
          const config = { headers: { "Content-Type": "application/json" } };

          const {data} = await axios.put('/api/v1/user/password/update',{oldPassword,newPassword},config);

          dispatch({ type:UPDATE_PASSWORD_SUCCESS, payload:data})
          
        } catch (error) {
          dispatch({type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message})
          
        }
      }
    export const getAllUsers = ()=>async(dispatch)=>{
      try {
        dispatch({ type:GET_ALL_USERS_REQUEST});

        const {data} = await axios.get('/api/v1/user/allusers')

        dispatch({ type:GET_ALL_USERS_SUCCESS,payload:data})
        
      } catch (error) {

        dispatch({ type:GET_ALL_USERS_FAIL, payload:error.response.data.message})
        
      }
    }

    export const removeUser = (id)=>async(dispatch)=>{
      try {
        dispatch({ type:REMOVE_USER_REQUEST});

        const {data} = await axios.delete(`/api/v1/user/remove/${id}`)

        dispatch({ type:REMOVE_USER_SUCCESS,payload:data.message})
        
      } catch (error) {

        dispatch({ type:REMOVE_USER_FAIL, payload:error.response.data.message})
        
      }
    }

    export const updateUserAdmin = (name,email,role,id) =>async(dispatch)=>{
      try {
        dispatch({type:UPDATE_USER_REQUEST_ADMIN})

        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.put(`/api/v1/user/update/${id}`,{name,email,role},config)

        dispatch({type:UPDATE_USER_SUCCESS_ADMIN, payload:data})
        
      } catch (error) {

        dispatch({type:UPDATE_USER_FAIL_ADMIN, payload:error.response.data.message})

      }
    }

    export const getUserDetailAdmin = (id) =>async(dispatch)=>{
      try {

        dispatch({type:GET_USER_DETAIL_REQUEST})

        const {data}  = await axios.get(`/api/v1/user/profile/${id}`)

        dispatch({type:GET_USER_DETAIL_SUCCESS,payload:data.user})
        
      } catch (error) {

        dispatch({type:GET_USER_DETAIL_FAIL,payload:error.response.data.message})
        
      }
    }