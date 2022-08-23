import React, { useEffect } from 'react'
import { useDispatch,useSelector} from 'react-redux'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { getAllOrdersAdmin } from '../../Redux/Actions/OrderAction'
import {MdDelete} from 'react-icons/md'
import Loader from '../../Components/Loader/Loader'
import MetaData from '../../Components/MetaData'

const DashboardOrders = () => {

  const dispatch = useDispatch()

  const {orders,loading} = useSelector(state=>state.order)
  useEffect(() =>{
    dispatch(getAllOrdersAdmin())

  },[dispatch])
  
  return (
    <div className="dashboard">
      <MetaData title={'All Orders'}/>
    <Sidebar/>
    <div className="dashboard-content">
    <div class="table-container">
  <ul class="responsive-table">
    <li class="table-header">
      <div class="col col-1">Order Id</div>
      <div class="col col-2">Order Price</div>
      <div class="col col-3">Payment Status</div>
      <div class="col col-3">Order Status</div>
      <div class="col col-4">Actions</div>
    </li>
{ loading ? <Loader/> : orders?.map(order=>(
  <li class="table-row" key={order._id}>
  <div class="col col-1" data-label="Order Id:">{order._id}</div>
  <div class="col col-2" data-label="Price">{order.totalPrice}</div>
  <div class="col col-3" data-label="PaymentInfo">{order.paymentInfo.status}</div>
  <div class="col col-3" data-label="OrderInfo">{order.orderStatus}</div>
  <div class="col col-4" data-label="Actions"><MdDelete className='delete-icon'/></div>
</li>
))}
    
  </ul>
</div> 
    </div>
       </div>
  )
}

export default DashboardOrders