import React from 'react'
import './sidebar.css'
import {Link} from 'react-router-dom'
import { useDispatch } from "react-redux";

const Sidebar = () => {

    const dispatch = useDispatch()

  return (
   <>
    <aside className="sidebar">
    <nav className="nav">
      <ul>
        <li className="active"><Link to="/admin/dashboard">DashBoard</Link></li>
        <li><Link to="/admin/products">All Products</Link></li>
        <li><Link to="/admin/addproduct">Create Products</Link></li>
        <li><Link to="/admin/orders">Orders</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
      </ul>
    </nav>
  </aside>
   </>
  )
}

export default Sidebar