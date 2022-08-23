import React from 'react'
import './confirmOrder.css'
import {useSelector} from 'react-redux'
import Loader from '../../Components/Loader/Loader'
import Step from '../../Components/Step/Step'
import {useNavigate} from 'react-router-dom'
import MetaData from '../../Components/MetaData'

 
const ConfirmOrder = () => {
    const {cartItems,shippingInfo} = useSelector(state=> state.cart)
    const {user,loading} = useSelector(state=> state.auth)


    const navigate = useNavigate()
   
	let totalPrice = cartItems.reduce((acc, item)=>acc + item.quantity*item.price,0);
  let subTotal = parseFloat(totalPrice).toFixed(2)
  let tax = parseFloat((totalPrice/100)*5).toFixed(2)
  let shippingPrice = totalPrice>200 ? 0 : 15
  let finalPrice = parseFloat(totalPrice + (totalPrice/100)*5 + (totalPrice<200 ? 15 : 0)).toFixed(2)

	const checkoutHandler=()=>{
    const data ={
           subTotal,
           tax,
           shippingPrice,
           finalPrice
    }
    sessionStorage.setItem('orderInfo',JSON.stringify(data))
          navigate("/shipping/payment")
	}


  return (
    <>
    <MetaData title={'Confirm Order'}/>
    {loading ? <Loader/> : <>
    <Step activeStep={1}/>
    <div className="confirm-oder-container">
        <div className="confirm-order-details">
            <div className="order-heading">Shipping Info:</div>
        {user && <div className="user-order-info">
                <span><h3>Name:</h3>{user.name}</span>
                <span><h3>Phone Number:</h3>{shippingInfo.phone}</span>
                <span><h3>Address:</h3>{shippingInfo.address},{shippingInfo.city},{shippingInfo.state},{shippingInfo.country}</span>

         </div>}
         <div className="order-heading">Your Cart Items:</div>

         <div className="user-order-products">
         <div className="shop">
			{cartItems && cartItems.map(item =>(
				<div className="box" key={item.product}>
				<img src={item.image} alt=""/>
				<div className="content">
					<h3>{item.name}</h3>
					<h4>${item.price} X {item.quantity} = ${item.price*item.quantity}</h4>
				</div>
			</div>
			))}
		</div>
         </div>
        </div>
        
        <div className="confirm-order-price">
        <div className="right-bar">
			<p><span>Subtotal</span> <span>${subTotal}</span></p>
			<hr/>
			<p><span>Tax (5%)</span> <span>${tax}</span></p>
			<hr/>
			<p><span>Shipping</span> <span>${shippingPrice}</span></p>
			<hr/>
			<p><span>Total</span> <span>${finalPrice}</span></p><button onClick={checkoutHandler} className="hover-button">Proceed To Payment</button>
		</div>
        </div>

    </div></>
    }

</>
  )
}

export default ConfirmOrder