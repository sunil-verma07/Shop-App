import React,{useEffect, useState} from 'react'
import { useSelector} from 'react-redux'

import Home from './Pages/Home/Home'
import './App.css'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import ProductList from './Pages/ProductList/ProductList'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Banner from './Components/Banner/Banner'
import Footer from './Components/Footer/Footer'
import ScrollToTop from './Components/ScrollToTop'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import store from './Redux/store'
import {loadUser} from './Redux/Actions/UserAction'
import Cart from './Pages/Cart/Cart'
import ProtectedRoute from './Components/Route/ProtectedRoute'
import Shipping from './Pages/ShippingInfo/ShippingInfo'
import ConfirmOrder from './Pages/ConfirmOrder/ConfirmOrder'
import Payment from './Pages/Payment/Payment'
import Contact from './Pages/Contact/Contact'
import Dashboard from './Pages/Dashboard/Dashboard'
import DashboardProducts from './Pages/DashboardProducts/DashboardProducts'
import DashboardOrders from './Pages/DashboardOrders/DashboardOrders'
import DashboardAddProduct from './Pages/DashboardAddProducts/DashboardAddProduct'
import DashboardUsers from './Pages/DashBoardUsers/DashboardUsers'
import DashBoardUserDetail from './Pages/DashboardUserDetail/DashBoardUserDetail'
import axios from 'axios'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'


const App = () => {
  const {user,isAuthenticated} = useSelector(state=> state.auth)

  const [stripeApiKey,setStripeApiKey] = useState('')

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/payment/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
  store.dispatch(loadUser())
    
  getStripeApiKey()
  },[])
  return (
    <div>
      <Router>
        <header>
        <Banner />
         <Navbar />
        </header>
        <ScrollToTop>
       <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/products" element={<ProductList/>}/>
        <Route exact path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/products/:keyword" element={<ProductList/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/contact" element={<Contact/>}/>

        <Route exact path="/admin/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user} isAdmin={true}><Dashboard/></ProtectedRoute>}/>
        <Route exact path="/admin/products" element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user} isAdmin={true}><DashboardProducts/></ProtectedRoute>}/>
        <Route exact path="/admin/addproduct" element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user} isAdmin={true}><DashboardAddProduct/></ProtectedRoute>}/>
        <Route exact path="/admin/orders" element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user} isAdmin={true}><DashboardOrders/></ProtectedRoute>}/>
        <Route exact path="/admin/users" element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user} isAdmin={true}><DashboardUsers/></ProtectedRoute>}/>
        <Route exact path='/admin/user/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user} isAdmin={true}><DashBoardUserDetail/></ProtectedRoute>}/>

        <Route exact path="/shipping" element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user}><Shipping/></ProtectedRoute>}/>
        <Route exact path="/shipping/confirmorder" element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user}><ConfirmOrder/></ProtectedRoute>}/>
        <Route exact path="/shipping/payment" element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
        {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment/>
        </Elements>
      )}</ProtectedRoute>}/>

       </Routes>
       </ScrollToTop>
       <footer>
       <Footer/>
       </footer>
       </Router>
    </div>
  )
}

export default App