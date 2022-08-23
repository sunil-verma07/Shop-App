import React,{useState} from 'react'
import './shipping.css'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {saveShippingInfo} from '../../Redux/Actions/CartAction'
import { Country, State, City }  from 'country-state-city';
import { toast } from 'react-toastify';
import CheckOutSteps from '../../Components/Step/Step';
import MetaData from '../../Components/MetaData'


const ShippingInfo = () => {
    const dispatch = useDispatch()
    const {shippingInfo}= useSelector(state => state.cart)
    const navigate = useNavigate()

    const [address,setAddress] =useState(shippingInfo.address)
    const [country,setCountry] =useState(shippingInfo.country)
    const [state,setState] =useState(shippingInfo.state)
    const [city,setCity] =useState(shippingInfo.city)
    const [phone,setPhone] =useState(shippingInfo.phone)
    const [pinCode,setPinCode]= useState(shippingInfo.pinCode)


    const ShippingInfoHandler =(e)=>{
        e.preventDefault()
        if(phone.length !== 10){
            toast.error("Phone Number should be of 10 Digits",{
                position: toast.POSITION.BOTTOM_CENTER
            })
            return
        }
        const data ={address,country,state,city,pinCode,phone}
        dispatch(saveShippingInfo(data))
        navigate('/shipping/confirmorder')
    }
  return (

   <>
   <MetaData title={' Shipping Info'}/>
   <CheckOutSteps activeStep={0}/>
  <div className="shipping-heading">Shipping details</div>

    <div className="shipping-page">
  <form action="" onSubmit={ShippingInfoHandler}>
  <div className="form__group field">
  <input type="input" className="form__field" placeholder="Phone" name="phone" id='phone' vlaue={phone} required onChange={(e)=>setPhone(e.target.value)} />
  <label htmlFor="phone" className="form__label">Phone</label>
</div>

<div className="form__group field">
  <select type="input" className="form__field" placeholder="Country" name="country" id='country' value={country} required onChange={(e)=>setCountry(e.target.value)} 
  >
    <option value="" >Country</option>
    {Country && Country.getAllCountries().map((item)=>(
        <option key={item.isoCode} value={item.isoCode}>{item.name}
        </option>
    ))}
  </select>
  
</div>
{country ? <div className="form__group field">
  <select type="input" className="form__field" placeholder="State" name="state" id='state' value={state} required onChange={(e)=>setState(e.target.value)}
   >
    <option value="">State</option>
    {State && State.getStatesOfCountry(country).map((state)=>(
        <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
    ))}
   </select>
</div> : 
<div className="form__group field">

<select type="input" disabled className="form__field"
   >
    <option value="">State</option></select></div> }


{
    country ? <div className="form__group field">
 <select type="input" className="form__field" placeholder="City" name="city" id='city' value={city} required onChange={(e)=>setCity(e.target.value)}
   >        <option value="">City</option>
        {City && City.getCitiesOfState(country,state).map((city)=>(
            <option key={city.isoCode} >{city.name}</option>
        ))}
    </select>
  </div> :<div className="form__group field">

<select type="input" disabled className="form__field" 
   >
    <option value="">City</option></select></div> 
}
<div className="form__group field">
  <input type="input" className="form__field" placeholder="Address" name="address" id='address' value={address} required onChange={(e)=>setAddress(e.target.value)} />
  <label htmlFor="address" className="form__label">Address</label>
</div>

<div className="form__group field">
  <input type="input" className="form__field" placeholder="pinCode" name="pinCode" id='pinCode' value={pinCode} required onChange={(e)=>setPinCode(e.target.value)} />
  <label htmlFor="pinCode" className="form__label">Pin Code</label>
</div>

<button className="hover-button" type="submit">submit</button>
  </form>
    </div>
    </>
  )
}

export default ShippingInfo