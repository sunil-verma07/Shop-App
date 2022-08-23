import express  from "express";
const Router = express.Router()
import {isAuthenticated, authorizeRoles} from '../utils/auth.js'
import {createOrder, deleteOrder, getAllOrders, getSingleOrder,myOrders, updateOrderStatus} from '../Controllers/OrderController.js'


Router.route("/new").post(isAuthenticated,createOrder)
Router.route("/myorders").get(isAuthenticated,myOrders)
Router.route("/allorders").get(isAuthenticated,authorizeRoles('admin'),getAllOrders)
Router.route("/:id").get(isAuthenticated,authorizeRoles('admin'),getSingleOrder)
Router.route("/update/:id").put(isAuthenticated,authorizeRoles('admin'),updateOrderStatus)
Router.route("/remove/:id").delete(isAuthenticated,authorizeRoles('admin'),deleteOrder)


export default Router;
