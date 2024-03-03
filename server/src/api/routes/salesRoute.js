const express=require('express')
const { getSalesReport, getSalesReportByDate, getSalesReportForOwner, getSalesReportForOwnerHotels , getSalesPerMonth, getSalesPerTwoWeek, getSalesPerDay, getSalesPerYear, downloadSalesReport, filterBookingsByDate, getBookingsGrouped, getAllHotelsMonthlySales, getOwnerDashBoardData } = require('../controllers/salesController')
const verifyAdminJwt = require('../middlewares/verifyAdminJwt');
const verifyOwnerJwt = require('../middlewares/verifyOwnerJwt');
const router=express.Router()

/**
 * @openapi
 * openapi: 3.0.0
 * info:
 *   title: Hotel Sales API
 *   version: 1.0.0
 * paths:
 *   '/api/sales/get-sales/{hotelId}':
 *     get:
 *       tags:
 *         - Sales
 *       summary: Get sales details by hotel ID
 *       parameters:
 *         - in: path
 *           name: hotelId
 *           required: true
 *           description: ID of the hotel to retrieve sales data for
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response with sales details
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetSalesByHotelResponse'
 *         '404':
 *           description: Hotel not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Hotel not found
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Internal server error
 * components:
 *   schemas:
 *     GetSalesByHotelResponse:
 *       type: object
 *       properties:
 *         hotelId:
 *           type: string
 *           description: ID of the hotel
 *         sales:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: Unique identifier for the sale
 *               product:
 *                 type: string
 *                 description: Name of the product
 *               amount:
 *                 type: number
 *                 description: Amount of the sale
 *       required:
 *         - hotelId
 *         - sales
 */

router.get('/get-all-sales-report-for-admin',getSalesReport);
router.get('/get-sales-by-date-admin/:startDate/:endDate',getSalesReportByDate)
router.get('/get-total-monthly-sales-of-all-hotels',getAllHotelsMonthlySales)


router.get('/filter-owner-sales-by-date/:startDate/:endDate',getSalesReportByDate)
router.get('/get-sales-report-booking/:hotel_id',getSalesReportForOwner)
router.get('/get-sales-report-hotel-owner/:user_id',getSalesReportForOwnerHotels)
router.get('/get-sales-per-week/:owner_id',getSalesPerTwoWeek)
router.get('/get-sales-per-month/:owner_id',getSalesPerMonth)
router.get('/get-sales-per-day/:owner_id',getSalesPerDay)
router.get('/get-sales-per-year/:owner_id',getSalesPerYear)
router.get('/download-sales-report',downloadSalesReport),
router.get('/filter-bookings-by-date/:startDate/:endDate',verifyOwnerJwt,filterBookingsByDate)
router.get('/get-bookings-grouped/:owner_id',verifyOwnerJwt,getBookingsGrouped);
router.get('/get-dashboard-data/:owner_id',verifyOwnerJwt,getOwnerDashBoardData)




module.exports=router