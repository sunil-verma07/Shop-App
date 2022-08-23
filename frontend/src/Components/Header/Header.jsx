import React,{useState,useEffect} from 'react'
import header from '../../assets/header.jpg'
import './header.css'
import {Link} from 'react-router-dom'
import winter from '../../assets/women-winter-wear.jpg'
import summer from '../../assets/women-summer-wear.jpg'
import casual from '../../assets/women-casuals.jpg'
import jeans from '../../assets/women-jeans.webp'

const Header = () => {


  return (
    <>
    <div className="header">
        <img src={header} alt="" />
        <div className="header-content">
            <h5> new</h5>
            <h1>
            women's </h1><hr /> <h4>fashion</h4> <hr />
            <Link to="/products"><span>shop now</span></Link>
        </div>
        </div>

        <div className="header-categories">
            <Link to="/products"><div className="header-container casual"><img src={casual} alt="" /><h3>Women Casual Wear</h3></div></Link>
            <div className="header-container summer"><img src={summer} alt="" /><h3>Women Summer Wear</h3></div>
            <div className="header-container winter"><img src={winter} alt="" /><h3>Women Winter Wear</h3></div>
            <div className="header-container jeans"><img src={jeans} alt="" /><h3>Women Bottom wear</h3></div>
        </div>
    
    </>
  )
}

export default Header