import React,{useEffect} from 'react'
import Header from '../../Components/Header/Header'
import Heading from '../../Components/Heading/Heading'
import Product from '../../Components/Product/Product'
import './home.css'
import Metadata from '../../Components/MetaData'
import {useDispatch , useSelector} from 'react-redux'
import {getProduct} from '../../Redux/Actions/ProductAction.js'

const Home = () => {
  const {products,loading,error} = useSelector((state) => state.product)
   
    const dispatch = useDispatch()
  useEffect(()=>{
   dispatch(getProduct())
  },[])
  return (
    <div>
     <Metadata title={`Buy Latest Fashion`}/>
      <Header/>
      <Heading heading="Featured Products"/>
      <div className="product-row">
        {products.slice(0,4).map((product) =>(
           <Product key={product._id} name={product.name} price={product.price} seller={product.seller} images={product.images} id={product._id}/>
        ))}
      </div>
      
    </div>
  )
}

export default Home