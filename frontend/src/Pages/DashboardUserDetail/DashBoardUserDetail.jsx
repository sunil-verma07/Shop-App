import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import MetaData from '../../Components/MetaData'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {getUserDetailAdmin, removeUser, updateUserAdmin } from '../../Redux/Actions/UserAction'
import './dashboardUserDetail.css'

const DashBoardUserDetail = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams()
    const {user} = useSelector(state=>state.userDetail)
    const {updateMessage} = useSelector(state=>state.updateUserAdminReducer)
    const {message,error} = useSelector(state=>state.updateProfile)

    const [name,setName] = useState(user && user.name)

    const [email,setEmail] = useState(user && user.email)

    const [role,setRole] = useState(user && user.role)

    const updateUserHandler =(e)=>{
      e.preventDefault()
      dispatch(updateUserAdmin(name,email,role,id))
      if(updateMessage === true){
        toast.success("User Updated Successfully",{
          position: toast.POSITION.BOTTOM_CENTER
        })
        navigate('/admin/users') 
      }
    }
    const removeUserHandler =()=>{
      dispatch(removeUser(id))
      if(message === "User Removed"){
        toast.success(message,{
          position: toast.POSITION.BOTTOM_CENTER
        })
        navigate('/admin/users')
      }
      if(error){
        toast.error(error,{
          position: toast.POSITION.BOTTOM_CENTER
        })
        navigate('/admin/users')
      }
    }
    useEffect(()=>{
      dispatch(getUserDetailAdmin(id))

    },[dispatch,id])
  return (
    <div>
      <MetaData title={'User Details'}/>
        <div className="dashboard">
    <Sidebar/>
    <div className="dashboard-content-update-user">
    
    <form className="user-admin-details" >
    <div className="input-wrapper">
  <input type="name" required name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
  <label htmlFor="user" >name</label>
</div>
<div className="input-wrapper">
  <input type="email" name="email" value={email}  onChange={(e)=>setEmail(e.target.value)}/>
  <label htmlFor="user">email</label>
</div>
<div className="input-wrapper">
<label htmlFor="user">role</label>
  <select required name="role" value={role} onChange={(e)=>setRole(e.target.value)}>
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>
</div>
<div className="button-group-update-user">
    <div className="hover-button user-admin"onClick={updateUserHandler}>Update</div>
    <div className="hover-button user-admin" onClick={removeUserHandler}>Delete User</div>
</div>
    </form>
    
 
    </div>
    
       </div>
    </div>
  )
}

export default DashBoardUserDetail