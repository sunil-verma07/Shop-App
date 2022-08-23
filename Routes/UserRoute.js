import express from 'express';
const Router = express.Router();

import {registration,login,logout,forgotPassword , resetPassword,getUserProfile,updatePassword,updateProfile,
getAllUserAdmin,getUserAdmin, updateUserAdmin, removeUserAdmin} from '../Controllers/UserController.js';
import {isAuthenticated,authorizeRoles} from '../utils/auth.js'


Router.route("/register").post(registration);
Router.route("/login").post(login);
Router.route("/logout").get(logout);
Router.route("/password/forgot").post(forgotPassword)
Router.route("/password/reset/:token").put(resetPassword)
Router.route("/profile").get(isAuthenticated,getUserProfile)
Router.route("/password/update").put(isAuthenticated,updatePassword)
Router.route("/update").put(isAuthenticated,updateProfile)
Router.route("/allusers").get(isAuthenticated,authorizeRoles('admin'),getAllUserAdmin);
Router.route("/profile/:id").get(isAuthenticated,authorizeRoles('admin'),getUserAdmin)
Router.route("/update/:id").put(isAuthenticated,authorizeRoles('admin'),updateUserAdmin)
Router.route("/remove/:id").delete(isAuthenticated,authorizeRoles('admin'),removeUserAdmin)


export default Router;


