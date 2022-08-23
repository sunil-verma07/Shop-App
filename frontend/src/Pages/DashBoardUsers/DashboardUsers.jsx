import React,{useEffect, useState} from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './dashboardUsers.css'
import {useDispatch, useSelector} from 'react-redux'
import { getAllUsers } from '../../Redux/Actions/UserAction'
import Loader from '../../Components/Loader/Loader'
import {GrView} from 'react-icons/gr'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import MetaData from '../../Components/MetaData'

const DashboardUsers = () => {
  const dispatch = useDispatch()
  const {users,loading} = useSelector(state=>state.getAllUsersReducer)

  const [searchInput,setSearchInput] = useState('')
  const [filteredItems, setFilteredItems] = useState(users)


  const searchItems =(searchValue)=>{

    setSearchInput(searchValue)

  if(searchInput !== ''){
    const filteredData = users.filter((item)=>{
      return Object.values(item.email).join('').toLowerCase().includes(searchInput.toLowerCase())
    })
    setFilteredItems(filteredData)
  }else{
    setFilteredItems(users)
  }
   }

  useEffect(() =>{
    dispatch(getAllUsers())
   
  },[dispatch])

  return (
    <div className="dashboard">
      <MetaData title={'All Users'}/>
    <Sidebar/>
    <div className="dashboard-content">
    <div className="admin-search-bar">
        <input icon="search" placeholder="Search User by Email" onChange={(e)=>searchItems(e.target.value)} /><BsSearch className="admin-search-icon"/>
      </div>
     <div class="table-container">
  <ul class="responsive-table">
    <li class="table-header">
      <div class="col col-1">User Id</div>
      <div class="col col-2">User Name</div>
      <div class="col col-3">User Email</div>
      <div class="col col-2">User Role</div>
      <div class="col col-4">Actions</div>
    </li>
{ loading ? <Loader/> : filteredItems?.map(user=>(
  <li class="table-row" key={user._id}>
  <div class="col col-1" data-label="User Id">{user._id}</div>
  <div class="col col-2" data-label="UserName">{user.name}</div>
  <div class="col col-3" data-label="Email">{user.email}</div>
  <div class="col col-2" data-label="Role">{user.role}</div>
  <div class="col col-4" data-label="Actions"><Link to={`/admin/user/${user._id}`}><GrView className='delete-icon'/></Link></div>
</li>
))}
    
  </ul>
</div> 


    </div>
    
       </div>
  )
}

export default DashboardUsers