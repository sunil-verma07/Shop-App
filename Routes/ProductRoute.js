import express  from "express";
const Router = express.Router()
import {isAuthenticated, authorizeRoles} from '../utils/auth.js'
import {createProduct,getAllProducts,getProductById,updateProduct,deleteProduct, reviwProduct, getReviewsById, deleteReview, getAllProductsAdmin} from '../Controllers/ProductController.js'

Router.route("/").get(getAllProducts)
Router.route("/products").get(getAllProductsAdmin)
Router.route("/new").post(isAuthenticated,authorizeRoles('admin'),createProduct)
Router.route("/reviews").get(getReviewsById).put(isAuthenticated,deleteReview)
Router.route("/review").put(isAuthenticated,reviwProduct)

Router.route("/:id").get(getProductById)
Router.route("/:id").delete(isAuthenticated,authorizeRoles('admin'),deleteProduct);

export default Router;