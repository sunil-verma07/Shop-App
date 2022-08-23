import React from 'react'
import './product.css';
import {NavLink } from 'react-router-dom'

const Product = ({name,images,price,seller,id}) => {
  
  return (
    <div className="product">
      <div className="image">
        <img src={images[0].url} alt="" />
        <NavLink to={`/product/${id}`}> <div className="quick-view">quick view</div></NavLink>
      </div>
      <div className="details">
        <h4>{name}</h4>
        <h5>{seller}</h5>
        <h4>${price}</h4>
      </div>
    </div>
  )
}

export default Product