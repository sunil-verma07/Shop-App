import React,{useState} from 'react'
import './cart.css'
import {useSelector,useDispatch} from 'react-redux'
import {AiFillCloseCircle} from 'react-icons/ai'
import {addItemsToCart,removeItemFromCart} from '../../Redux/Actions/CartAction.js'
import emptyCart from '../../assets/empty-cart.png'
import {Link,useNavigate} from 'react-router-dom'
import {MdOutlineKeyboardArrowDown,MdOutlineKeyboardArrowUp} from 'react-icons/md'
import MetaData from '../../Components/MetaData'


const Cart = () => {

	const navigate = useNavigate()
    const dispatch = useDispatch()

    const {cartItems} = useSelector(state=> state.cart)

    const [quantity,setQuantity] = useState(1)

    const increaseQuantity=(id,quantity,stock)=>{
        const newQuantity = quantity+1;
     if(quantity >= stock){
        return;
     }else{
        dispatch(addItemsToCart(id,newQuantity))
     }
    }
    const decreaseQuantity=(id,quantity)=>{
        const newQuantity = quantity -1;
        if(quantity > 1){
            dispatch(addItemsToCart(id,newQuantity))
        }
      }
    const removeItem =(id)=>{
        return dispatch(removeItemFromCart(id))
    }
	const totalPrice = cartItems.reduce((acc, item)=>acc + item.quantity*item.price,0);
    const totalItems =cartItems.reduce((acc,item)=> acc + item.quantity,0);

	const checkoutHandler=()=>{
          navigate("/login?redirect=/shipping")
	}

  return (
    <>
	<MetaData title={`Your Cart`}/>
    <div className="wrapper">
	<div className="product-page-link"><Link to ="/Products"> Products </Link>&nbsp;/&nbsp; Your cart</div>
		<div className="cart-heading">Your Cart({totalItems} {totalItems === 1 ? <>item</> : <>items</>})</div>
		{cartItems.length === 0 ? <>
		<div className="empty-cart">
			<div className="empty-cart-image"><img src={emptyCart} alt="" /></div>
			<span>Your Cart Is Empty</span>
			<Link to="/products"><div className="empty-cart-btn">Continue Shopping</div></Link>
		</div>
		</> : 
		<div className="project">
		<div className="shop">
			{cartItems && cartItems.map(item =>(
				<div className="box" key={item.product}>
				<img src={item.image} />
				<div className="content">
					<h3>{item.name}</h3>
					<h4>Price: ${item.price}</h4>
					<p className="unit"><button onClick={()=>decreaseQuantity(item.product,item.quantity)}><MdOutlineKeyboardArrowDown/></button>
					<input name="number" value={item.quantity} readOnly />
					<button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}><MdOutlineKeyboardArrowUp/></button></p>
					<div className="cart-remove-button"  onClick={() => removeItem(item.product)}><AiFillCloseCircle/></div>
				</div>
			</div>
			))}
		</div>
		<div className="right-bar">
			<p><span>Subtotal</span> <span>${parseFloat(totalPrice).toFixed(2)}</span></p>
			<hr/>
			<p><span>Tax (5%)</span> <span>${parseFloat((totalPrice/100)*5).toFixed(2)}</span></p>
			<hr/>
			<p><span>Shipping</span> <span>${totalPrice>200 ? <>0</> : <>15</>}</span></p>
			<hr/>
			<p><span>Total</span> <span>${parseFloat(totalPrice + (totalPrice/100)*5 + (totalPrice<200 ? 15 : 0)).toFixed(2)}</span></p><button onClick={checkoutHandler} className="hover-button"><i className="fa fa-shopping-cart"></i>Checkout</button>
		</div>
	</div>}
	</div>
   </>
  )
}

export default Cart