import React from 'react'
import './login.css'
import Loader from '../../Components/Loader/Loader'
import { useEffect,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify';
import {Link,useNavigate,useLocation} from 'react-router-dom'
import {login,clearErrors} from '../../Redux/Actions/UserAction'
import MetaData from '../../Components/MetaData'

const Login = () => {
  const navigate = useNavigate()
  
  const location = useLocation()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const {isAuthenticated,loading,error} = useSelector(state=>state.auth)

  const dispatch = useDispatch();
  
  const redirect = location.search ? location.search.split('=')[1] :'/'

   useEffect(()=>{
    if(error){
      toast.error(error,{
        position: toast.POSITION.BOTTOM_CENTER
      })
      dispatch(clearErrors());

    }
    if(isAuthenticated){
      return navigate(redirect)
    }
    
   },[isAuthenticated,redirect,error])

   const handleLogin =(e)=>{
      e.preventDefault();
      dispatch(login(email,password))
   }
  

  return (
    <div className="login">
      <MetaData title={'Login User'}/>
    {loading ? <Loader/> : <>
    <div className="login-heading">sign in</div>
        <div className="login-wrapper">
        <div className="login-form" >
          <form action="" onSubmit={handleLogin}>
            <div className="email input-group">
            <label htmlFor="">Email:</label>
            <input type="email" className="input" value={email} placeholder="Enter Your Email" autoComplete="off" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="password input-group">
            <label htmlFor="">Password:</label>
            <input type="password" className="input" value={password} placeholder="Enter Your Password" autoComplete="off" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="login-links">
                <button className="login-button" type='submit'>
                    sign in
                </button>
                <div className="fp">
                    <Link to="/">forgot your password?</Link>
                </div>
            </div>
          </form>
        </div>
        <div className="register-link">
            <div className="heading">
                New Customer?
            </div>
            <div className="register-content">
                <div className="register-p">Create an account with us and you will able to:</div>
                <ul>
                    <li>Check out faster.</li>
                    <li>Save multiple shipping addresses.</li>
                    <li>Access your order history.</li>
                    <li>Track new orders</li>
                </ul>
            </div>
            <div className="login-button create">
                    <Link to="/register">create account</Link>
                </div>
        </div>
    
        </div></>}
</div>
  )

  }
export default Login