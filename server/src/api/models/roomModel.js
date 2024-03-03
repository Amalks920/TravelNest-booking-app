const mongoose = require("mongoose"); // Erase if already required
const ObjectId = require("mongodb").ObjectId;

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateRoomInput:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - password
 *        - roomType
 *        - description
 *        - bedding
 *        - features
 *        - size
 *        - amenities
 *        - bathroomType
 *        - rate
 *      properties:
 *        roomType:
 *          type: string
 *          default: single
 *          # Description of the room
 *        description:
 *          type: string
 *          default: "aljsdf alsdjfl dslkdflk dsl sldkfjlk"
 *          # Type of bedding in the room
 *        bedding:
 *          type: string
 *          default: single
 *          # Features associated with the room (as a string)
 *        features:
 *          type: string
 *          default: tv
 *          # Size of the room in square units
 *        size:
 *          type: number
 *          default: 0  # Replace with the appropriate default size
 *          # Amenities available in the room (as an array of strings)
 *        amenities:
 *          type: array
 *        items:
 *          type: string
 *          default: ["skd", "lsdf", "skldfj", "nv", "sldj"]
 *          # Type of bathroom in the room (e.g., En-suite, Bathtub, Shower)
 *        bathroomType:
 *          type: string
 *          default: lsdjlsd
 *          # Rate or cost of the room
 *        rate:
 *          type: number
 *          default: 34544
 *    CreateRoomResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 */

const roomSchema = new mongoose.Schema({
  // Unique identifier for the room
  id: { type: mongoose.Schema.Types.ObjectId },

  // Type of the room (e.g., single, double, suite, etc.)
  roomType: {
    type: String,
    enum: [
      "single",
      "double",
      "suite",
      "family",
      "adjoining",
      "presidential",
      "penthouse",
    ],
    required: true,
  },

  // Description of the room
  description: { type: String, required: true },

  // Type of bedding in the room
  //bedding: { type: String, enum: ['En-suite', 'Bathtub', 'Shower'], required: true },

  // Features associated with the room (as an array of strings)
  features: { type: [String], default: [] },

  // Size of the room in square units
  size: { type: Number, required: true },

  // Amenities available in the room (as an array of strings)
  amenities: { type: [String], default: [] },

  noOfRooms: {
    type: Number,
    required: true,
    default: 0,
  },

  no_of_rooms_available: {
    type: Number,
    required: true,
    default: function () {
      return this.noOfRooms
    }
  },
  // Type of bathroom in the room (e.g., En-suite, Bathtub, Shower)
  bathroomType: {
    type: String,
    enum: ["en-suite", "bathtub", "shower"],
    required: true,
  },

  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },

  noOfPeopleAllowed:{
    type:Number,
    required:true,
    default:1
  },

  // Array of images associated with the hotel
  images: { type: [String], default: [] },

  // Rate or cost of the room
  rate: { type: Number, required: true },

  status: {
    type: String,
    required: true,
    enum: ["delisted","listed","not-registered"],
    default:'not-registered'
  },

  rating:{
    type: Number,
    default:0
  },

  // Timestamp for when the room was created
  // timestamps: { type: Date, default: Date.now },
  created_at: { type: Date, required: true, default: Date.now },
});

// Define the Room model
const Room = mongoose.model("Room", roomSchema);

// Export the Room model
module.exports = Room;

// things to add in this schema
// no of rooms  available || no of occupied rooms
