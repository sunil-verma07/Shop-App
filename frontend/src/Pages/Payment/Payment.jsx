import React from 'react'
import './payment.css'
import Step from '../../Components/Step/Step'
import {useStripe, useElements , CardNumberElement , CardExpiryElement ,CardCvcElement} from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Payment = () => {
  const element = useElements()
  const stripe = useStripe()
  const navigate = useNavigate()

  const {user} = useSelector(state=>state.auth)

  const options ={
    style:{
        base:{
          fontSize:'16px'
        },
        invalid:{
          color:'#9e2146'
        }
    }
  }
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))


  const paymentData = {
    amount : Math.round(orderInfo.finalPrice)
  }

  const submitPayment = async(e)=>{
     e.preventDefault()

     document.querySelector('#pay_btn').disabled = true;

     let res;

     try {
      
     const config ={
      headers:{
        'Content-Type': 'application/json'
      }
     }

     res = await axios.post('/payment/process',paymentData,config)

     const clientSecret = res.data.client_secret

     if(!stripe || !element){
      return;
     }

     const result = await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:element.getItem(CardNumberElement),
        billing_details:{
          name:user.name,
          email:user.email
        }
      }
     })
     if(result.error){
      toast.error(result.error,{
        position: toast.POSITION.BOTTOM_CENTER
      })
      document.querySelector('#pay_btn').disabled = false;

     }else{
      if(result.paymentIntent.status === 'succeeded'){
        navigate('/')
      }else{
        toast.error('There is some issue while processing payment',{
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
     }
      
     } catch (error) {
      document.querySelector('#pay_btn').disabled = false;
      toast.error(error.response.data.message,{
        position: toast.POSITION.BOTTOM_CENTER
      })
      
     }
  }

  return (
    <div>
      <Step activeStep={2}/>
<div className="card-info">
           <div className="payment-card">
           <div className="input-group">
            <label htmlFor="">Card Number:</label>
            <CardNumberElement type="text" className="input" autoComplete="off" options={options}/>
            </div>

           <div className="bottom-inputs">
           <div className="input-group">
            <label htmlFor="">Card Expiry:</label>
            <CardExpiryElement type="text" className="input-date" autoComplete="off" options={options}/>
            </div>

            <div className="input-group">
            <label htmlFor="">Card CVC:</label>
            <CardCvcElement type="text" className="input-cvv" autoComplete="off" options={options}/>
            </div>
           </div>
           <div className="card-images">
            <div className="visa-card"></div>
            <div className="master-card"></div>
            <div className="paypal"></div>
           </div>
           <button className="hover-button pay-btn" id='pay_btn' onClick={submitPayment} >Pay {`- ${orderInfo && orderInfo.finalPrice}`}</button>
           </div>
         
</div>

    </div>
  )
}

export default Payment