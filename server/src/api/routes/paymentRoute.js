const express=require('express')
const { payment, webHookController, payUsingWallet } = require('../controllers/paymentController')
const router=express.Router()
const verifyJwt = require('../utils/verifyJwt');
const checkAvailability = require('../middlewares/checkAvailability');


router.post('/payment',verifyJwt,checkAvailability,payment)
router.post('/webhook',webHookController);
router.post('/payment-using-wallet',verifyJwt,payUsingWallet)
module.exports=router
