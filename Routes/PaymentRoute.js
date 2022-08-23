import express from 'express';
const Router = express.Router();
import {processPayment, sendApiKey} from '../Controllers/PaymentController.js'
import {isAuthenticated} from '../utils/auth.js'

Router.post('/process',isAuthenticated,processPayment)

Router.get('/stripeapikey',isAuthenticated,sendApiKey)

export default Router;