const express=require('express')
const { addCoupon, getAllCouponsOwner, getAllCoupnsOwnerLength, getAllCouponsUser, deListCoupon, getACouponController, editCoupon } = require('../controllers/couponController')
const verifyOwnerJwt = require('../middlewares/verifyOwnerJwt')
const verifyJwt = require('../utils/verifyJwt')
const router=express.Router()


/**
 * @openapi
 * paths:
 *   '/api/coupon/create-coupon':
 *     post:
 *       tags:
 *         - Coupon
 *       summary: create Coupon
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateCouponInput'
 *       responses:
 *         200:
 *           description: create coupon document
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CreateCouponResponse'
 *         402:
 *           description: Failed to get create coupon
 *         400:
 *           description: Bad request
 */

//owner
router.post('/add-coupon',verifyOwnerJwt,addCoupon)
router.get('/get-all-coupon-owner',verifyOwnerJwt,getAllCouponsOwner)
router.get('/get-all-coupons-owner-length',verifyOwnerJwt,getAllCoupnsOwnerLength)
router.post('/delistCoupon/:id',verifyOwnerJwt,deListCoupon)


//user
router.get('/get-all-coupon-user',getAllCouponsUser)


/**
 * @openapi
 * paths:
 *   '/api/coupon/edit-coupon/{coupon-id}':
 *     put:
 *       tags:
 *         - Coupon
 *       summary: edit Coupon
 *       parameters:
 *         - in: path
 *           name: user-id
 *           required: true
 *           description: id of user
 *           schema:
 *             type: string  # or whatever type hotel-id is
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateCouponInput'
 *       responses:
 *         200:
 *           description: eidt coupon document
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CreateCouponResponse'
 *         402:
 *           description: Failed to edit coupon
 *         400:
 *           description: Bad request
 */

router.post('/edit-coupon/:coupon_id',editCoupon)

/**
 * @openapi
 * paths:
 *   '/api/user/delete-coupon/{coupon-id}':
 *     delete:
 *       tags:
 *         - Coupon
 *       summary: Delete Coupon by ID
 *       parameters:
 *         - in: path
 *           name: coupon-id
 *           required: true
 *           description: The ID of the coupon to delete
 *           schema:
 *             type: string  # or whatever type user-id is
 *       responses:
 *         200:
 *           description: Coupon deleted successfully
 *         402:
 *           description: Failed to delete Coupon
 *         400:
 *           description: Bad request
 */



router.delete('/delete-coupon/{coupon-id}',(req,res)=>{
    res.status(200).json({})
})

/**
 * @openapi
 * paths:
 *   '/api/user/get-a-coupon/{coupon-id}':
 *     get:
 *       tags:
 *         - Coupon
 *       summary: Get a Coupon by ID
 *       parameters:
 *         - in: path
 *           name: coupon-id
 *           required: true
 *           description: The ID of the coupon to retrieve
 *           schema:
 *             type: string  # or whatever type coupon-id is
 *       responses:
 *         200:
 *           description: Coupon document retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetAllUsersResponse'
 *         402:
 *           description: Failed to fetch Coupon document
 *         400:
 *           description: Bad request
 */


router.get('/get-a-coupon/:coupon_id',getACouponController)


module.exports=router