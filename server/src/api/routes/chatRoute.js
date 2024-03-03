const express=require('express')
const verifyJwt = require('../utils/verifyJwt')
const { getConversations, getMessages, sendMessage, getUsersChat } = require('../controllers/chatController')
const router=express.Router()

/**
 * @openapi
 * paths:
 *   '/api/messages/get-messages/{user-id}/{owner-id}':
 *     get:
 *       tags:
 *         - Chat
 *       summary: Get messages of chat between hotel owner and customer
 *       parameters:
 *         - in: path
 *           name: user-id
 *           required: true
 *           description: The ID of the user
 *           schema:
 *             type: string  # or whatever type user-id is
 *         - in: path
 *           name: hotel-owner-id
 *           required: true
 *           description: The ID of the owner
 *           schema:
 *             type: string  # Replace with the actual type of room-id (e.g., ObjectId)
 *       responses:
 *         200:
 *           description: messages  retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CreateMessageResponse'
 *         402:
 *           description: Failed to fetch user document
 *         400:
 *           description: Bad request
 */

router.get('/get-messages/{user-id}/{owner-id}',(req,res)=>{
    res.status(200).json({})
})

  /**
   * @openapi
   * '/api/messages/create-message':
   *  post:
   *     tags:
   *     - Chat
   *     summary: create a message document
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateMessageResponse'
   *     responses:
   *      200:
   *        description: Success
   *      400:
   *        description: Bad request
   */

router.post('/create-message/{user-id}',(req,res,next)=>{
    res.status(200).json({})
})

  /**
   * @openapi
   * '/api/messages/create-chat/{user-id}/{owner-id}':
   *  post:
   *     tags:
   *     - Chat
   *     summary: create a chat document
   *     responses:
   *      200:
   *        description: Success
   *      400:
   *        description: Bad request
   */

router.post('/create-chat/{user-id}/{owner-id}',(req,res)=>{
    res.status(200).json({})
})


router.get("/conversations/:user_id", getConversations);
router.get("/:otherUserId/:userId",getMessages);
router.get('/:owner_id',getUsersChat)
router.post("/", sendMessage);



module.exports=router;