const userModel = require("./userModel.js");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const Schema = mongoose.Schema;
const uuid = require('uuid'); // Import the uuid library

/**
 * @openapi
 * components:
 *  schemas:
 *    GetAllBookingResponse:
 *      type: object
 *      properties:
 *        userEmail:
 *          type: string
 *        userid:
 *          type: string
 *        userName:
 *          type: string
 *        hotelName:
 *          type: string
 *        hotelLocation:
 *        couponid:
 *          type: string
 *        rooms:
 *          type: Array
 *        checkin:
 *          type: date
 *        checkout:
 *          type: date
 *        totalDays:
 *          type: number
 *        totalAmount:
 *          type: number
 *        discountAmount:
 *          type: number
 *        status:
 *          type: string
 *        paymentType:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

const bookingSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    userId: {
      type: ObjectId,
      required: true,
      ref: "User", // Provide the name of the referenced model as a string
    },
    userName: {
      type: String,
      required: true,
    },

    userPhone: {
      type: String,
      required: true,
    },

    booking_id: {
      type: String,
      default: uuid.v4, // Generate a unique identifier using uuid.v4
      unique: true,
    },

    totalNoOfRooms: {
      type: Number,
      required: true,
    },

    hotelName: {
      type: String,
      required: true,
    },
    hotel_id: {
      type: ObjectId,
      ref: "Hotel",
      required: true,
    },
    roomDetails: 
[ {     noOfPeopleAllowed:Number,
      _id:{
        type:ObjectId,
        ref:'Room',
      },
      roomType:String,
      rate:Number,
      noOfRooms:Number
}]
      // type: Array,
      // required: true,
    ,
    // noOfRooms:{
    //   type:Number,
    //   required:true
    // },
    checkIn: {
      type: Date,
    },
    checkOut: {
      type: Date,
    },
    totalDays: {
      type: Number,
      // required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    discountAmount: {
      type: Number,
      // required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "checkIn", "checkOut", "cancelled"],
      default: "paid",
    },
    guestDetails: {
      type: Array,
      default: [],
    },
    payementType: {
      type: String,
      // required: true,
      default: "null",
      enum:["wallet","card"]
    }, // Remove the extra comma here
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
