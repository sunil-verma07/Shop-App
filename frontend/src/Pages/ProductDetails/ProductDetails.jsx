import React, { useEffect,useState} from "react";
import {useParams,Link} from 'react-router-dom'
import Metadata from '../../Components/MetaData'
import "./productdetails.css";
import Heading from '../../Components/Heading/Heading'
import {toast} from 'react-toastify'
import ReactStars from 'react-stars'
import {Modal} from '@mui/material'
import {FaUserCircle} from 'react-icons/fa' 
import { BsTruck, BsCreditCard2Back } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addReview, allReviews, getProductDetails } from "../../Redux/Actions/ProductAction.js";
import Loader from "../../Components/Loader/Loader";
import Carousel from "../../Components/Carousel/Carousel";
import {addItemsToCart} from '../../Redux/Actions/CartAction.js'

const ProductDetails = () => {
     const {loading,productDetail} = useSelector(state=> state.productDetails)
     const {message} = useSelector(state => state.productReview)
     const {reviews} = useSelector(state => state.getProductReviews)
    
     let {id} = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch(allReviews(id))

    
  }, [id,dispatch]);

  const [reviewModal,setReviewModal] = useState(false) 
  const [quantity,setQuantity] = useState(1)
  const [reviewComment,setReviewComment] = useState('')
  const [reviewStar, setReviewStar] = useState('')
  const [noOfReviews,setNoOfReviews] = useState(3)


  const starRatingUpdate =(newRating)=>{
     setReviewStar(newRating)
  }
  const loadMoreFunction =()=>{

    setNoOfReviews(prev=> prev + 3)

  }

  const increaseQuantity=(e)=>{
   
         setQuantity(quantity+1)
    
  }
  const decreaseQuantity=(e)=>{
      if(quantity > 1){
          setQuantity(quantity-1)
      }
  }
  const submitReviewHandler =()=>{
    
    dispatch(addReview(reviewStar,reviewComment,id))
    if(message){
      toast.success(message,{
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
    setReviewModal(false)
  }

  const addToCartHandler =()=>{
    toast.success("Item Added to Cart",{
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(addItemsToCart(id,quantity))
  }

  return (
    <div>
      <Metadata title={productDetail.name}/>
      {loading ? <Loader/> : <>
      <div className="product-page-link"><Link to ="/">Home </Link>&nbsp;/&nbsp;<Link to ="/Products"> Products </Link>&nbsp;/&nbsp; {productDetail.name}</div>
      <div className="product-details">
        <div className="product-carousel">
        {productDetail.images && <Carousel images={productDetail.images} />}
      
        </div>
        <div className="details">
          <div className="product-name">
           {productDetail.name}
          </div>
          <div className="product-owner">{productDetail.seller}</div>
          <div className="product-price">
            $<span>{productDetail.price - 50}</span>${productDetail.price}
          </div>
          <div className="product-rating">
          <ReactStars
             count={5}
             value={productDetail.ratings}
             size={28}
            color2={'#000000'}
            edit={false}
             />
          <div className="review-btn" onClick={()=>setReviewModal(true)}>Write a Review</div>
          <Modal open={reviewModal} onBackdropClick={()=>setReviewModal(false)}>
            <div className="review-modal">
              <div className="review-modal-heading">
                Write A Review
              </div>
              <div className="review-modal-body">
                <ReactStars
             count={5}
             size={50}
            color2={'#000000'}
            edit={true}
            onChange={starRatingUpdate}
             />
             <div className="product-review-section">
             <span>Write Your Comment:</span>
             <textarea name="review" id="review" cols="30" rows="10" placeholder="Write your review" onChange={(e)=>setReviewComment(e.target.value)}></textarea>
             <div className="load-btn" onClick={submitReviewHandler}>Submit Review</div>
                </div>
              </div>

            </div>
          </Modal>
          </div>
          <div className="product-stock">{productDetail.stock >= 1 ? 'In Stock' : 'Out of Stock'}</div>
          <div className="unit"><button onClick={decreaseQuantity}>-</button><input readOnly type="number" className="quantity-input" value={quantity}/> <button onClick={increaseQuantity}>+</button></div>
          <button className="add-button"  onClick={addToCartHandler} >Add to cart</button>
          <div className="product-info">
            <span>
              <BsCreditCard2Back />
              <p>SHOP NOW, PAY LATER WITH AFTERPAY & ZIP</p>
            </span>
            <span>
              <BsTruck />
              <p>FREE SHIPPING ON AU ORDERS OVER $200</p>
            </span>
          </div>
          <div className="product-description">
            <span>Product Details:</span>
            <br />
            {productDetail.description}
          </div>
        </div>
      </div>
      <div className="product-review-container">
        <Heading heading="Product Reviews"/>
        {reviews?.length > 0 ?  reviews?.slice(0,noOfReviews).map((item)=>(
        <div className="product-review" key={item?._id}>
          <div className="product-review-user-info">
          <FaUserCircle className="user-icon"/>
          <div className="user-name">{item?.name}</div>
          </div>
          <div className="product-review-rating">
            <ReactStars
            count={5}
            value={item?.rating}
            size={28}
           color2={'#000000'}
           edit={false}/>
          </div>
          <div className="product-review-comment">
           {item?.comment} </div>
        </div>)) : <><div className="no-reviews">No Reviews Yet</div></>}
        {reviews?.length > 3 && <div className="load-btn" onClick={loadMoreFunction}>Load More</div>}
      </div>
      </>}
    </div>
  );
};

export default ProductDetails;
