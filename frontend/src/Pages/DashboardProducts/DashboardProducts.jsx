import React,{useEffect, useState} from 'react'
import './dashboardProducts.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../Components/Loader/Loader'
import {MdDelete} from 'react-icons/md'
import {BsSearch} from 'react-icons/bs'
import { getAllProductsAdmin, removeProductAdmin } from '../../Redux/Actions/ProductAction'
import MetaData from '../../Components/MetaData'


const DashboardProducts = () => {

  const dispatch = useDispatch()
  const {products,loading} = useSelector(state=>state.product)

  const [searchInput,setSearchInput] = useState('')
  const [filteredItems, setFilteredItems] = useState(products)

   const searchItems =(searchValue)=>{

    setSearchInput(searchValue)

  if(searchInput !== ''){
    const filteredData = products.filter((item)=>{
      return Object.values(item.name).join('').toLowerCase().includes(searchInput.toLowerCase())
    })
    setFilteredItems(filteredData)
  }else{
    setFilteredItems(products)
  }
   }
  

  useEffect(()=>{
    dispatch(getAllProductsAdmin())
  },[dispatch])

  return (
    <div className="dashboard">
      <MetaData title={'All Products'}/>
    <Sidebar/>
    <div className="dashboard-content">
      <div className="admin-search-bar">
        <input icon="search" placeholder="Search By Product Name" onChange={(e)=>searchItems(e.target.value)} /><BsSearch className="admin-search-icon"/>
      </div>
    <div class="table-container">
  <ul class="responsive-table">
    <li class="table-header">
      <div class="col col-1">Product Id</div>
      <div class="col col-2">Product Name</div>
      <div class="col col-2">Price</div>
      <div class="col col-4">Actions</div>
    </li>
 { loading ? <Loader/> : filteredItems?.map(product=>(
  <li class="table-row" key={product._id}>
  <div class="col col-1" data-label="Product Id">{product._id}</div>
  <div class="col col-2" data-label="Name">{product.name}</div>
  <div class="col col-2" data-label="Price">{product.price}</div>
  <div class="col col-4" data-label="Actions"><MdDelete className='delete-icon' onClick={()=>dispatch(removeProductAdmin(product._id))}/></div>
</li>
))} 
    
  </ul>
</div>
    </div>
       </div>
  )
}

export default DashboardProducts