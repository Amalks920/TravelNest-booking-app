const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateCouponInput:
 *      type: object
 *      required:
 *        - couponcode
 *        - description
 *        - discountType
 *        - discountAmount
 *        - minimumAmount
 *        - expirationDate
 *        - maximumRedemption
 *        - totalRedemption
 *      properties:
 *        couponcode:
 *          type: string
 *          default: OFFER13
 *        description:
 *          type: string
 *          default: lsdf sldkjf lskdf l soieosl
 *        discountType:
 *          type: string
 *          default: percentage
 *        discountAmount:
 *          type: number
 *          default: 100
 *        minimumAmount:
 *          type: number
 *          default: 100
 *        expirationDate:
 *          type: date
 *          default: 1-12-2023
 *        maximumRedemption:
 *          type: number
 *          default: 1
 *        totalRedemption:
 *          type: number
 *          default: 1
 *    CreateCouponResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 */

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  discountType: {
    type: String,
    enum: ['Percentage', 'Fixed'],
    required: true,
  },
  discountAmount: {
    type: Number,
    min: 0,
    max: 2000,
    default:0
  },
  percentageDiscount:{
    type:Number,
    min:0,
    max:100,
    default:0
  },
  minimumAmount: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  maxRedemptions: {
    type: Number,
    default: null, // Set to null for unlimited redemptions
  },
  totalRedemptions: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Coupon', couponSchema,'coupons')