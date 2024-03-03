const express = require('express');
const { getAllBookings, getAllBookingsOfUser, getABookingForUser, getABookingForOwner, changeBookingStatus, cancelBookingController, getUserBookingDocumentLength, getAllBookingsLength, getAllHotelBookings, getAllHotelBookingsLength } = require('../controllers/bookingController');
const verifyJwt = require('../utils/verifyJwt');
const verifyOwnerJwt = require('../middlewares/verifyOwnerJwt');
const router = express.Router();





/**
 * @openapi
 * paths:
 *   '/api/booking/create-booking':
 *     post:
 *       tags:
 *         - booking
 *       summary: create booking
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllBookingResponse'
 *       responses:
 *         200:
 *           description: create booking document
 *         402:
 *           description: Failed to get booking details
 *         400:
 *           description: Bad request
 */

router.post('/create-booking',(req,res)=>{
    res.status(200).json({})
})

/**
 * @openapi
 * paths:
 *   '/api/booking/get-all-bookings':
 *     get:
 *       tags:
 *         - booking
 *       summary: book
 *       responses:
 *         200:
 *           description: get-all-bookings
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetAllBookingResponse'
 *         402:
 *           description: Failed to get booking details
 *         400:
 *           description: Bad request
 */

router.get('/get-all-bookings-owner/:hotel_id',verifyOwnerJwt,getAllBookings);
router.get('/get-all-bookings-length-owner/:hotel_id',verifyOwnerJwt,getAllBookingsLength);


/**
 * @openapi
 * paths:
 *   '/api/booking/get-booking/{user-id}':
 *     get:
 *       tags:
 *         - booking
 *       summary: get booking details of  a user
 *       parameters:
 *         - in: path
 *           name: user-id
 *           required: true
 *           description: id of user
 *           schema:
 *             type: string  # or whatever type hotel-id is
 *       responses:
 *         200:
 *           description: get-user-booking
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetAllBookingResponse'
 *         402:
 *           description: Failed to get booking details
 *         400:
 *           description: Bad request
 */
router.get('/get-booking/{user-id}',(req,res)=>{
    res.status(200).json({})
})

/**
 * @openapi
 * paths:
 *   '/api/booking/cancel-booking/{booking-id}':
 *     put:
 *       tags:
 *         - booking
 *       summary: cancel booking
 *       parameters:
 *         - in: path
 *           name: booking-id
 *           required: true
 *           description: id of booking document
 *           schema:
 *             type: string  # or whatever type booking-id is
 *       responses:
 *         200:
 *           description: deleted booking document
 *         402:
 *           description: Failed to delete booking document
 *         400:
 *           description: Bad request
 */

// router.put('/cancel-booking/{booking-id}',(req,res)=>{
//     res.status(200).json({})
// })


// user
router.get('/get-bookings-of-user/:user_id/:pageNumber',verifyJwt,getAllBookingsOfUser)
router.get('/get-bookings-of-user-length/:user_id',verifyJwt,getUserBookingDocumentLength)

router.get('/get-a-booking-for-user/:booking_id',verifyJwt,getABookingForUser)

router.post('/cancel-booking/:booking_id',verifyJwt,cancelBookingController)

//owner
router.get('/get-a-booking-for-owner/:booking_id',verifyOwnerJwt,getABookingForOwner)
router.post('/change-status/:booking_id',verifyOwnerJwt,changeBookingStatus);
router.get('/get-all-hotel-bookings',verifyOwnerJwt,getAllHotelBookings)
router.get('/get-all-hotel-bookings-length',verifyOwnerJwt,getAllHotelBookingsLength)


module.exports=router