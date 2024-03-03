const express = require('express');
const { addRoom, getRooms, editRoom, getRoomsByType, editRoomDescription, addRoomImages, getRoomsForUser, getARoomForUser, checkAvailabilityOfRoom, getRoomsByLocation, getHotelRoomsByLocation, filterRoomsByLocation, updateRoomNumber } = require('../controllers/roomController');
const router = express.Router();
const uploader=require('../../config/multer');
const verifyJwt = require('../utils/verifyJwt');
const checkAvailability = require('../middlewares/checkAvailability');
const checkAvailabilityOfRooms = require('../middlewares/checkAvailabilityOfRooms');
const verifyOwnerJwt = require('../middlewares/verifyOwnerJwt');
/**
 * @openapi
 * paths:
 *   '/api/room/{hotel-id}':
 *     post:
 *       tags:
 *         - Room
 *       summary: add a room of a hotel
 *       parameters:
 *         - in: path
 *           name: hotel-id
 *           required: true
 *           description: The ID of the hotel to delete
 *           schema:
 *             type: string  # or whatever type hotel-id 
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateRoomInput'
 *       responses:
 *         200:
 *           description: Hotel document added successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CreateRoomResponse'
 *         402:
 *           description: Failed to added hotel document
 *         400:
 *           description: Bad request
 */

router.post('/add-room/:hotel_id',verifyOwnerJwt,uploader.array('images',10),addRoom)

/**
 * @openapi
 * paths:
 *   '/api/room/{hotel-id}/{room-id}':
 *     post:
 *       tags:
 *         - Room
 *       summary: add a room of a hotel
 *       parameters:
 *         - in: path
 *           name: hotel-id
 *           required: true
 *           description: The ID of the hotel to which the room belongs
 *           schema:
 *             type: string  # Replace with the actual type of hotel-id (e.g., ObjectId)
 *         - in: path
 *           name: room-id
 *           required: true
 *           description: The ID of the room to add
 *           schema:
 *             type: string  # Replace with the actual type of room-id (e.g., ObjectId)
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateRoomInput'
 *       responses:
 *         200:
 *           description: Room document added successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CreateRoomResponse'
 *         402:
 *           description: Failed to add room document
 *         400:
 *           description: Bad request
 */

router.put('/edit-room/:hotel-id/:room-id',verifyOwnerJwt,editRoom)




router.get('/get-rooms-list/:hotel_id',verifyOwnerJwt,getRoomsByType)

/**
 * @openapi
 * paths:
 *   '/api/room/{hotel-id}/{room-id}':
 *     delete:
 *       tags:
 *         - Room
 *       summary: add a room of a hotel
 *       parameters:
 *         - in: path
 *           name: hotel-id
 *           required: true
 *           description: The ID of the hotel to which the room belongs
 *           schema:
 *             type: string  # Replace with the actual type of hotel-id (e.g., ObjectId)
 *         - in: path
 *           name: room-id
 *           required: true
 *           description: The ID of the room to add
 *           schema:
 *             type: string  # Replace with the actual type of room-id (e.g., ObjectId)
 *       responses:
 *         200:
 *           description: Room document deleted successfully
 *         402:
 *           description: Failed to add room document
 *         400:
 *           description: Bad request
 */

router.delete('/delete-room/{hotel-id}/{room-id}',(req,res)=>{
    res.status(200).json({msg:'room deleted'})
})

/**
 * @openapi
 * paths:
 *   '/api/room/get-a-room/{room-id}':
 *     get:  # Correct indentation
 *       tags:
 *         - Room
 *       summary: get room by ID
 *       parameters:
 *         - in: path
 *           name: room-id
 *           required: true
 *           description: The ID of the room to get
 *           schema:
 *             type: string  # or whatever type room-id is
 *       responses:
 *         200:
 *           description: room fetched successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CreateRoomInput'
 *         402:
 *           description: Failed to get room
 *         400:
 *           description: Bad request
 */

router.get('/get-a-room/:room_id',checkAvailability,getARoomForUser)

/**
 * @openapi
 * paths:
 *   '/api/room/get-room/{hotel-id}':
 *     get:  # Correct indentation
 *       tags:
 *         - Room
 *       summary: get rooms in a hotel
 *       parameters:
 *         - in: path
 *           name: hotel-id
 *           required: true
 *           description: The ID of the htoel to get rooms 
 *           schema:
 *             type: string  # or whatever type hotel-id is
 *       responses:
 *         200:
 *           description: rooms fetched successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CreateRoomInput'
 *         402:
 *           description: Failed to get rooms
 *         400:
 *           description: Bad request
 */

router.get('/get-rooms/:hotel_id',verifyOwnerJwt,getRooms)

router.get('/check-availability-of-room/:room_id',checkAvailability,checkAvailabilityOfRoom)


//user
router.post('/get-all-rooms-user/:hotel_id',checkAvailabilityOfRooms,getRoomsForUser);
router.get('/get-avg-rating-of-room/',verifyJwt,)
router.get('/get-all-rooms-by-location',checkAvailability,getRoomsByLocation)
router.get('/get-all-rooms/:location',getHotelRoomsByLocation)

router.get('/get-all-rooms-by-location/:location',checkAvailability,filterRoomsByLocation)

//owner
router.put('/edit-room-description/:room_id',verifyOwnerJwt,editRoomDescription )
router.put('/update-room-number/:room_id',verifyOwnerJwt,updateRoomNumber)
router.put('/add-images/:room_id',verifyJwt,uploader.array('images',10),addRoomImages)

module.exports=router;