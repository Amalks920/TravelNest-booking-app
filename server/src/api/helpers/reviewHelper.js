const reviewModel = require("../models/reviewModel");
const mongoose = require("mongoose");

const addReviewHelper = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await reviewModel.create(data);
      console.log(await reviewModel.find({}));
      resolve(response);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const getReviewDoneByUser = (booking_id, user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await reviewModel.findOne({
        $and: [{ booking_id: booking_id }, { user_id: user_id }],
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const findReviewsOfHotelByHotelIdHelper = (hotel_id,room_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      //   const response = await reviewModel.find(
      //      {hotel_id: new mongoose.Types.ObjectId(hotel_id)}
      //      )

      const response = await reviewModel.aggregate([
        {
          $match: {
            room_id: new mongoose.Types.ObjectId(room_id),
          },
        },

        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $unwind: "$userDetails", // Unwind to get a flat structure for user details
        },
        {
          $project: {
            userName: "$userDetails.username",
            created_time: "$created_at",
            description: "$description",
            images: "$images",
            rating:'$rating'
          },
        }
      ]);
      console.log(room_id)
      console.log('(((((((===review response==)))))))')
      console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  addReviewHelper,
  getReviewDoneByUser,
  findReviewsOfHotelByHotelIdHelper,
};
