import React, { useState,useEffect } from "react";
import "./Navbar.css";
import { BiSearchAlt2 } from "react-icons/bi";
import {toast} from 'react-toastify'
import {BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import {HiOutlineShoppingBag} from 'react-icons/hi'
import { Link } from "react-router-dom";
import {logout, updatePassword } from "../../Redux/Actions/UserAction";
import { useSelector, useDispatch } from "react-redux";
import Menu from '@mui/material/Menu';
import { clearErrors, updateProfile } from '../../Redux/Actions/UserAction'
import {loadUser} from '../../Redux/Actions/UserAction'
import {UPDATE_PASSWORD_RESET, UPDATE_USER_RESET} from '../../Redux/Constants/UserConstant'
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import {Modal} from '@mui/material'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const {cartItems} = useSelector((state) => state.cart)
  const {isUpdatedPassword,isUpdatedProfile,error} = useSelector(state=> state.updateProfile)
 
  const [openModal,setOpenModal] = useState(false);
  const [passwordModal,setPasswordModal]= useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu ,setOpenMenu] = useState(false)
  const [anchorE1,setAnchorE1] = useState()
  const [searchOpen,setSearchOpen] = useState(false)
  const [keyword, setKeyword] = useState("");
  

  const [name , setName] = useState('');
  const [email,setEmail]= useState('')
  const [oldPassword,setOldPassword] = useState('')
  const [newPassword,setNewPassword] = useState('')
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = (e)=>{
    setOpenMenu(false)
  }
  const handleCloseModal=()=>{
    setOpenModal(false)
  }

  const handleClick=(e)=>{
    setAnchorE1(e.currentTarget);
    setOpenMenu(true);
   }
   const handleSearch=()=>{
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
      setSearchOpen(false)
    } else {
      navigate("/products");
      setSearchOpen(false)
    }
   }

   const logoutHandler = () => {
    toast.success('Logout Successfully',{
      position:toast.POSITION.BOTTOM_CENTER
    })
    dispatch(logout())
    setOpenMenu(false)
  }
  const updateHandler =(e) =>{
    e.preventDefault()
    dispatch(updateProfile(name,email))
}

const passwordUpdateHandler=(e)=>{
     e.preventDefault()
     dispatch(updatePassword(oldPassword,newPassword))
}
useEffect(()=>{
    if(user){
        setName(user.name)
        setEmail(user.email)
    }
    if(error){
      toast.error(error,{
        position: toast.POSITION.BOTTOM_CENTER
      }) 
      dispatch(clearErrors())
    }
    if (isUpdatedProfile) {
      setOpenModal(false)

    toast.success(isUpdatedProfile,{
   position: toast.POSITION.BOTTOM_CENTER
})            
    dispatch(loadUser());
  
        navigate("/");
     
        dispatch({
          type: UPDATE_USER_RESET,
        });
      }
      if(error){
        toast.error(error,{
            position: toast.POSITION.BOTTOM_CENTER
        })
        dispatch(clearErrors());
    }
    if(isUpdatedPassword){
      setPasswordModal(false);
       toast.success(isUpdatedPassword,{
        position: toast.POSITION.BOTTOM_CENTER
       })
        navigate('/');
        dispatch({
            type: UPDATE_PASSWORD_RESET,
          });
    }

},[isUpdatedProfile,isUpdatedPassword])
  return (
    <div className="Navbar">
      <div className={`nav-items ${isOpen && "open"}`}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
      <span className="nav-logo"><Link to="/">ShopApp</Link></span>
      <div className="icons">
        <div className="search">
          <a onClick={()=>setSearchOpen(true)}>
            <BsSearch />
          </a>
          <Modal
          open={searchOpen}
          onBackdropClick={()=>setSearchOpen(false)}
          >
          <div className="search-box">
          <input
          type="text"
          class="input-search"
          placeholder="Type to Search..."
          onChange={(e)=>setKeyword(e.target.value)}
        />  <BiSearchAlt2 onClick={handleSearch} className="search-button" onKeyDown={handleSearch}/></div>
          </Modal>
        </div>
        <div className="cart">
          <Link to="/cart">
            <HiOutlineShoppingBag/>
           {cartItems.length !== 0 &&  <span id="cart-quantity">{cartItems.length}</span>}
          </Link>
        </div>
        <div className="profile">
        {!isAuthenticated ? <Link to="/login"><CgProfile/></Link> : <a><CgProfile onClick={handleClick}/></a>}
        <Menu
        open={openMenu}
        onClose={handleClose}
        anchorEl={anchorE1}
        id="account-menu">

        <MenuItem>
        {isAuthenticated && <div>Welcome {user.name}</div>
}
        </MenuItem>
        <Divider />
       {user?.role=='admin' && <MenuItem >
         <Link to="/admin/dashboard">DashBoard</Link>
        </MenuItem>}

        <MenuItem onClick={()=>{setOpenModal(true)} }>
        Update Profile
        </MenuItem>

        <Modal
        onBackdropClick={handleCloseModal}
       open={openModal}>
         <div className="update-profile-form">
      <form onSubmit={updateHandler}>
        <div className="form__group field">
  <input type="name" className="form__field" placeholder="Name" name="name" id='name' value={name} required onChange={(e)=>setName(e.target.value)} />
  <label htmlFor="name" className="form__label">Name</label>
</div>
<div className="form__group field">
  <input type="email" className="form__field" placeholder="Email" name="email" id='email' value={email} required onChange={(e)=>setEmail(e.target.value)} />
  <label htmlFor="name" className="form__label">Email</label>
</div>
<button className='hover-button' type='submit'>Update Profile</button>
        </form>
      </div>
       </Modal>

        <MenuItem onClick={()=>setPasswordModal(true)}>
        Update Password
        </MenuItem>
        <Modal
        onBackdropClick={()=>setPasswordModal(false)}
       open={passwordModal}>
         <div className="update-profile-form">
      <form onSubmit={passwordUpdateHandler}>
        <div className="form__group field">
  <input type="password" className="form__field" placeholder="Password" name="password" id='old-password'  required onChange={(e)=>setOldPassword(e.target.value)} />
  <label htmlFor="password" className="form__label">Old Password</label>
</div>
<div className="form__group field">
  <input type="password" className="form__field" placeholder="Password" name="password" id='new-password' required onChange={(e)=>setNewPassword(e.target.value)} />
  <label htmlFor="password" className="form__label">New Password</label>
</div>
<button className='hover-button' type='submit'>Update Password</button>
        </form>
      </div>
       </Modal>
        <MenuItem onClick={logoutHandler}>
         Logout
        </MenuItem>
      </Menu>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
