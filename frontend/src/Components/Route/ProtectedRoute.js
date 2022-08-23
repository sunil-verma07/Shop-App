import React from 'react'
import { Outlet,useNavigate } from 'react-router-dom'

const ProtectedRoute = ({isAuthenticated,children,isAdmin,user}) => {
     const navigate = useNavigate();

        if(isAuthenticated === false){
            return navigate('/login');
        }

        if(isAdmin === true && user.role !== 'admin'){
            return navigate('/login');
        }
          
  return children ? children : <Outlet/>
   
}

export default ProtectedRoute