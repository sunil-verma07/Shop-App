import React,{useState,useEffect} from 'react'
import './register.css'
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import {register} from '../../Redux/Actions/UserAction.js'
import MetaData from '../../Components/MetaData'

const Register = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch() 

  const {isAuthenticated,error} = useSelector(state=>state.auth)
  

  const [user,setUser] = useState({
    name:"",
    email:"",
    password:""
  })

  const {name,email,password} = user;

  const redirect = location.search ? location.search.split('=')[1] :'/accounts/profile'
  
  useEffect(() => {
    
   if(isAuthenticated){
    return navigate(redirect)
   }
   if(error){
    toast.error(error,{
      position: toast.POSITION.BOTTOM_CENTER
    })
   }
  })

const handleregister=(e)=>{
   e.preventDefault();
 
        dispatch(register(name,email,password))
}

const onChange = (e)=>{
  setUser({
    ...user,
    [e.target.name]:e.target.value

  })

}
  return (
    <>
    <MetaData title={'SignUp'}/>
    <div className="register">
       <div className="register-heading">New User</div>
        <div className="register-wrapper">
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
        </div>
        <div className="register-form">
          <form action="" encType='multipart/form-data' onSubmit={handleregister}>
          <div className="name input-group">
            <label htmlFor="">Name:</label>
            <input type="text" className="input" name='name' value={name} placeholder="Enter Your Name" autoComplete="off" onChange={onChange}/>
            </div>
            <div className="email input-group">
            <label htmlFor="">Email:</label>
            <input type="email" className="input" name='email' value={email} placeholder="Enter Your Email" autoComplete="off" onChange={onChange}/>
            </div>
            <div className="password input-group">
            <label htmlFor="">Password:</label>
            <input type="password" className="input" name='password' value={password} placeholder="Enter Your Password" autoComplete="off" onChange={onChange}/>
            </div>
            <div className="register-links">
                <button className="register-button" type='submit'>
                    register
                </button>
                <div className="fp">
                    <Link to="/login">already a user?</Link>
                </div>
            </div>
          </form>
        </div>
    
        </div>
     </div>
     </>
  )
}

export default Register