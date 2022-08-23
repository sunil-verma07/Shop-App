import React, { useEffect} from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './dashboard.css'
import { Chart, registerables } from 'chart.js';
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Redux/Actions/UserAction';
import { getAllProductsAdmin } from '../../Redux/Actions/ProductAction';
import { getAllOrdersAdmin } from '../../Redux/Actions/OrderAction';
import MetaData from '../../Components/MetaData';

Chart.register(...registerables);




const Dashboard = () => {
    const dispatch = useDispatch()

    const {orders} = useSelector(state=>state.order)
    const {users} = useSelector(state=>state.getAllUsersReducer)
    const {products} = useSelector(state=>state.product)

    
  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllProductsAdmin());
    dispatch(getAllOrdersAdmin());
  }, [dispatch]);
   
    let totalAmount = 0;
    orders && orders.forEach((item) => {
        totalAmount += item.totalPrice;
      });

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, totalAmount],
          },
        ],
      };

      const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock, products.length - outOfStock],
          },
        ],
      };

    useEffect(()=>{

      
    },[])
  return (
    <div className="dashboard">
      <MetaData title={'Admin DashBoard'}/>
 <Sidebar/>
 <div className="dashboard-content">
    
    <div className="quantity-slide">
    <div className="quantity-slide-child">
            <div className="heading-text-slide">
            Total Income
            </div>
            <div className="amount-slide">
            ${totalAmount}
            </div>
        </div>
        <div className="quantity-slide-child">
        <div className="heading-text-slide">
            Orders
            </div>
            <div className="amount-slide">
            {orders && orders.length}
            </div> 
            </div>
        <div className="quantity-slide-child">
        <div className="heading-text-slide">
            Total Products
            </div>
            <div className="amount-slide">
            {products && products.length}
            </div>       
             </div>
        <div className="quantity-slide-child">
        <div className="heading-text-slide">
            Users
            </div>
            <div className="amount-slide">
            {users && users.length}
            </div>        
            </div>

    </div>
    <div className="line-chart">
<div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
        
    </div>
   
    
 </div>
    </div>
  )
}

export default Dashboard