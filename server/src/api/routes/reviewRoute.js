const express=require('express');
const { addReview, getReviewOfAHotelForUser, getReviewOfAHotelForAdmin } = require('../controllers/reviewController');
const verifyJwt = require('../utils/verifyJwt');
const uploader= require('../../config/multer');
const verifyOwnerJwt = require('../middlewares/verifyOwnerJwt');
const router=express.Router();

/**
 * @openapi
 * paths:
 *   '/api/review/{hotel-id}/add-review':
 *     post:
 *       tags:
 *         - Review
 *       summary: add a review of a hotel
 *       parameters:
 *         - in: path
 *           name: hotel-id
 *           required: true
 *           description: The ID of the hotel
 *           schema:
 *             type: string  # or whatever type hotel-id 
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateReviewInput'
 *       responses:
 *         200:
 *           description: review document added successfully
 *         402:
 *           description: Failed to added review document
 *         400:
 *           description: Bad request
 */

router.post('/add-review',verifyJwt,uploader.array('images',10),addReview);

/**
 * @openapi
 * paths:
 *   '/api/review/get-all-review/{hotel-id}':
 *     get:
 *       tags:
 *         - Review
 *       summary: get review details by ID
 *       responses:
 *         200:
 *           description: User details edited successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetAllHotelsResponse'
 *         402:
 *           description: Failed to edit user details
 *         400:
 *           description: Bad request
 */




router.get('/get-all-review/{hotel-id}',(req,res)=>{
    res.status(200).json({})
})

/**
 * @openapi
 * paths:
 *   '/api/review/edit-review/{review-id}':
 *     post:
 *       tags:
 *         - Review
 *       summary: edit a review of a hotel
 *       parameters:
 *         - in: path
 *           name: hotel-id
 *           required: true
 *           description: The ID of the hotel
 *           schema:
 *             type: string  # or whatever type hotel-id 
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateReviewInput'
 *       responses:
 *         200:
 *           description: review document added successfully
 *         402:
 *           description: Failed to added review document
 *         400:
 *           description: Bad request
 */

router.put('/edit-review/{review_id}',(req,res)=>{
    res.status(200).json({})
})

/**
 * @openapi
 * paths:
 *   '/api/review/delete-review/{review-id}':
 *     delete:
 *       tags:
 *         - Review
 *       summary: Delete review by ID
 *       parameters:
 *         - in: path
 *           name: hotel-id
 *           required: true
 *           description: The ID of the review to delete
 *           schema:
 *             type: string  # or whatever type hotel-id is
 *       responses:
 *         200:
 *           description: review deleted successfully
 *         402:
 *           description: Failed to delete review
 *         400:
 *           description: Bad request
 */

router.delete('/delete-review/{review_id}',(req,res)=>{
    res.status(200).json({})
})

/**
 * @openapi
 * paths:
 *   '/api/review/get-a-review/{review-id}':
 *     get:  # Correct indentation
 *       tags:
 *         - Review
 *       summary: get review by ID
 *       parameters:
 *         - in: path
 *           name: review-id
 *           required: true
 *           description: The ID of the review to get
 *           schema:
 *             type: string  # or whatever type review-id is
 *       responses:
 *         200:
 *           description: review fetched successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CreateReviewInput'
 *         402:
 *           description: Failed to get review
 *         400:
 *           description: Bad request
 */

router.get('/get-a-review/{review_id}',(req,res)=>{
    res.status(200).json({})
})


router.get('/get-review-of-hotel-user/:hotel_id',getReviewOfAHotelForUser)
router.get('/get-hotel-reviews-for-owner/:hotel_id',verifyOwnerJwt,getReviewOfAHotelForAdmin)


module.exports=router