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

    export const authReducer = (state = { user: {} }, action) => {
        switch (action.type) {
          case LOGIN_REQUEST:
          case REGISTER_REQUEST:
          case LOAD_USER_REQUEST:
            return {
              loading: true,
              isAuthenticated: false,
            };
         
          case LOGIN_SUCCESS:
          case REGISTER_SUCCESS:
          case LOAD_USER_SUCCESS:
            return {
              ...state,
              user: action.payload,
              loading: false,
              isAuthenticated: true, 
            };
          case LOGOUT_SUCCESS:
              return {
                loading: false,
                isAuthenticated: false,
                user:{}
              }
          case LOGIN_FAIL:
          case REGISTER_FAIL:
          case LOAD_USER_FAIL:
            return {
              ...state,
              loading: false,
              isAuthenticated: false,
              user: null,
              error: action.payload,
            };
          case LOGOUT_FAIL:
              return{
                ...state,
                error:action.payload,
              }
      
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
      
          default:
            return state;
        }
      };

      export const updateReducer = (state = {}, action) => {
        switch (action.type) {
          case UPDATE_PASSWORD_REQUEST:
          case UPDATE_USER_REQUEST:
          case REMOVE_USER_REQUEST:
            return {
              loading: true,
            };
            case REMOVE_USER_SUCCESS:
              return{
                ...state,
                message: action.payload
              }
          case UPDATE_PASSWORD_SUCCESS:
            return {
              ...state,
              isUpdatedPassword: action.payload,
              loading: false,
            };
          case UPDATE_USER_SUCCESS:
            return {
              ...state,
              isUpdatedProfile: action.payload,
              loading: false,
            };
          case UPDATE_PASSWORD_FAIL:
          case UPDATE_USER_FAIL:
          case REMOVE_USER_FAIL:
            return {
              ...state,
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

      export const updateUserReducer = (state = {message:{},user:{}}, action) => {
        switch (action.type) {
         
          case UPDATE_USER_REQUEST_ADMIN:
            return {
              loading: true,
            };

          case UPDATE_USER_SUCCESS_ADMIN:
            return {
              ...state,
              updateMessage: action.payload.success,
              user:action.payload.user,
              loading: false,
            };
          case UPDATE_USER_FAIL_ADMIN:
            return {
              ...state,
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

      
      export const getUserDetailReducer = (state = {user:{}}, action) => {
        switch (action.type) {
          case GET_USER_DETAIL_REQUEST:
            return {
              loading: true,
            };
          case GET_USER_DETAIL_SUCCESS:
               return{
                ...state,
                user: action.payload,
              }
          
          case GET_USER_DETAIL_FAIL:
            return {
              ...state,
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

      

      export const getAllUsersReducer = (state = {users:[],userCount:{}}, action) => {
        switch (action.type) {
          case GET_ALL_USERS_REQUEST:
            return {
              loading: true,
            };
         
          case GET_ALL_USERS_SUCCESS:  
              return {
              ...state,
              users: action.payload.users,
              userCount: action.payload.count,
              loading: false,
            };
          
          case GET_ALL_USERS_FAIL:
            return {
              ...state,
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

      
      