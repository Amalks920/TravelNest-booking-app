const mongoose = require("mongoose"); // Erase if already required
const ObjectId = require("mongodb").ObjectId;

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateReviewInput:
 *      type: object
 *      properties:
 *        user_id:
 *          type: string
 *        heading:
 *          type: string
 *        description:
 *          type: string
 *        rating:
 *          type: number
 *        images:
 *          type: Array
 */

const reviewSchema = new mongoose.Schema(
  {
    booking_id: {
      type: ObjectId,
      ref: "Booking",
      required: true,
    },
    user_id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    hotel_id:{
      type:ObjectId,
      ref:'Hotel',
      required:true
    },
    room_id:{
      type:ObjectId,
      ref:'Room',
      required:true
    },
    // heading:{
    //     type:String,
    //     required:true
    // },
    description: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    images: {
      type: Array,
      required: true,
    },

    created_at: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Review", reviewSchema);
module.exports = Booking;
