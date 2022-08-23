import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './addproduct.css'
import {useDispatch, useSelector} from 'react-redux'
import { clearErrors, createNewProduct } from '../../Redux/Actions/ProductAction'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { CREATE_NEW_PRODUCT_RESET } from '../../Redux/Constants/ProductConstant'
import MetaData from '../../Components/MetaData'

const DashboardAddProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isLoading,error,success} = useSelector(state=>state.createProduct)

  const [name,setName] = useState('')
  const [desc,setDesc]= useState('')
  const [price,setPrice] = useState(0)
  const [category,setCategory]= useState('')
  const [seller,setSeller]= useState('')
  const [stock,setStock] = useState(0)
  const [images,setImages] = useState([])
  const [imagePreview,setImagePreview] = useState([])

  const categories = [
                
    'Casual',
    'Winter',
    'Summer',
    'Bottom',
    'Top'
]

useEffect(()=>{
if(success){
  toast.success(success,{
    position: toast.POSITION.BOTTOM_CENTER
  })
  navigate('/admin/dashboard')
  dispatch({ type: CREATE_NEW_PRODUCT_RESET })

}
  
if(error){
  toast.error(error.message,{
    position: toast.POSITION.BOTTOM_CENTER
  })
  dispatch(clearErrors())
}

},[dispatch,success,error,navigate])

const productSubmitHandler = (e)=>{
    e.preventDefault()
  const myForm = new FormData();
  myForm.set('name',name)
  myForm.set('description',desc)
  myForm.set('price',price)
  myForm.set('category',category)
  myForm.set('seller',seller)
  myForm.set('stock',stock)

  images.forEach((image)=>{
    myForm.append('images',image)
  })

  dispatch(createNewProduct(myForm))
}

const productImageChange =(e)=>{
  e.preventDefault()

  const files = Array.from(e.target.files)

  setImages([])
  setImagePreview([])

  files.forEach((file)=> {
    const reader = new FileReader();

    reader.onload =()=>{
      if(reader.readyState === 2){
        setImagePreview((old)=> [...old, reader.result])
        setImages((old)=> [...old, reader.result])
      }
    }

    reader.readAsDataURL(file)
  })

}


  return (
    <div className="dashboard">
      <MetaData title={'Create New Product'}/>
    <Sidebar/>
    <form className="dashboard-content" onSubmit={productSubmitHandler} encType="multipart/form-data"
>
    
      <div className="dashboard-product-info">
         <div className="input-wrapper">
  <input type="name" required name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
  <label htmlFor="user" >name</label>
</div>

<div className="input-wrapper">
<textarea required name="desc" value={desc} onChange={(e)=>setDesc(e.target.value)} rows="6"/>
  <label htmlFor="description" >Description</label>
</div>

<div className="input-wrapper">
<input type="number" required name="price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
  <label htmlFor="price" >price</label>
</div>

<div className="input-wrapper">
<select required name="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
  {categories.map((item)=>(
    <option value={item}>{item}</option>
  ))}
</select>
  <label htmlFor="price" >category</label>
</div>

<div className="input-wrapper">
  <input type="name" required name="seller" value={seller} onChange={(e)=>setSeller(e.target.value)}/>
  <label htmlFor="user" >seller</label>
</div>

<div className="input-wrapper">
<input type="number" required name="stock" value={stock} onChange={(e)=>setStock(e.target.value)}/>
  <label htmlFor="price" >stock</label>
</div>
<div className="input-file-wrapper">
<input type="file" multiple required name="files" className="input-file" onChange={productImageChange}/>
<div className="file-upload-btn">Upload Image</div>
</div>
      </div>
     {imagePreview.length !==0 && <div className="dashboard-image-box">
      {
        imagePreview.map((image,index)=>{
          return <div className="image-preview">
          <img src={image} key={index} alt="" />
        </div>
        })
      }
      </div>}
      <button className="hover-button create-btn" type="submit" disabled={isLoading ? true: false} >submit</button>
    </form>
       </div>
  )
}

export default DashboardAddProduct