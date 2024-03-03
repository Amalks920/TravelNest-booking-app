const { resolve } = require("path");
const cloudinary = require("../../config/cloudinary");
const hotelModel = require("../models/hotelModel");
const roomModel=require('../models/roomModel')
const mongoose = require("mongoose");

const uploadImages = (files) => {
  return new Promise(async (resolve, reject) => {
    let cloudImgArray = [];
    try {
      for (var i = 0; i < files.length; i++) {
        cloudImage = await cloudinary.uploader.upload(files[i].path, {
          timeout: 60000,
        });
        cloudImgArray.push(cloudImage);
      }
      console.log(cloudImgArray);
      resolve(cloudImgArray);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const saveHotelDocumentHelper = function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await hotelModel.create(data);
      resolve(response);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const getHotelsHelper = async function (id = null,pageNumber) {
    try {
      const hotels = await hotelModel.find({owner_id:id}).skip((pageNumber-1)*3).limit(pageNumber*3);
      return hotels;
    } catch (error) {
      return error;
    }
};

const getAllHotelsLengthHelper=async (userId)=>{
  try {
    const response=await hotelModel.find({owner_id:userId});
    return response.length;
  } catch (error) {
    return error
  }
}

const getAHotelHelper = function (hotel_id) {
  return new Promise((resolve, reject) => {
    try {
      const hotel = hotelModel.findOne({ _id: hotel_id });
      resolve(hotel);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const getAHotelHelperForOrder = function (hotel_id) {
  return new Promise((resolve, reject) => {
    try {

      const hotel = hotelModel.findOne(
        { _id: hotel_id },
        {
          _id:1,
          hotelName:1
        }
        );
      resolve(hotel);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const editHotelHelper = function (data, imagePathArray) {
  const { hotelName, location, description, hotel_id } = data;
  console.log(data);
  console.log(hotel_id);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await hotelModel.updateOne(
        { _id: hotel_id },
        {
          $set: {
            hotelName,
            location,
            description,
          },
          $push: {
            images: {
              $each: imagePathArray,
            },
          },
        }
      );

      // resolve(response)
      resolve(response);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const getAllHotelDetailsHelper = (hotel_id) => {
  console.log(hotel_id);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await hotelModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(hotel_id),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "owner_id",
            foreignField: "_id",
            as: "owner",
          },
        },
        {
          $unwind: "$owner",
        },
        {
          $project: {
            _id: 1,
            hotelName: 1,
            description: 1,
            images: 1,
            averageRating: 1,
            location: 1,
            status: 1,
            created_at: 1,
            owners_name: "$owner.username",
            owners_email: "$owner.email",
            owners_phone: "$owner.phone",
            owner_isBlocked: "$owner.isBlocked",
            owner_joined_date: "$owner.createdAt",
          },
        },
      ]);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllHotelsForAdminHelper=async (pageNumber)=>{
  // return new Promise(async (resolve,reject)=>{
    try {
      const response = await hotelModel.find({}).sort({ _id: -1 }).skip((pageNumber - 1) * 4).limit(4);
      return response
    } catch (error) {
       throw error
    }
  // })
}

const getAllHotelForAdminLengthHelper= async ()=>{
  try {
    const response = await hotelModel.find({})
    return response.length
  } catch (error) {
    throw error
  }
}

const deleteHotelImageHelper = (hotel_id, img_public_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await hotelModel.updateOne(
        { _id: hotel_id },
        {
          $pull: {
            images: img_public_id,
          },
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const changeHotelStatusHelper = (hotel_id, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await hotelModel.updateOne(
        { _id: hotel_id },
        {
          $set: {
            status: status,
          },
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllHotelsForUserHelper = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await hotelModel.find({ status: "listed" });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const getAHotelForUserHelper = (hotel_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await hotelModel.findOne({
        $and: [
          {
            _id: hotel_id,
          },
          {
            status: "listed",
          },
        ],
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const editHotelNameHelper=(hotel_id,hotelName)=>{
  return new Promise(async (resolve,reject)=>{
    try {
      const response=await hotelModel.updateOne(
        {_id:hotel_id},
        {
          $set:{
            'hotelName':hotelName
          }
        }
        )
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

const editHotelLocationHelper=(hotel_id,location)=>{
  return new Promise(async (resolve,reject)=>{
    try {
      const response=await hotelModel.updateOne(
        {_id:hotel_id},
        {
          $set:{
            'location':location
          }
        }
        )
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

const editHotelDescriptionHelper=(hotel_id,description)=>{
  return new Promise(async (resolve,reject)=>{
    try {
      const response=await hotelModel.updateOne(
        {_id:hotel_id},
        {
          $set:{
            'description':description
          }
        }
        )
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

const addHotelImagesHelper=(hotel_id,imagePathArray)=>{
  return new Promise(async (resolve,reject)=>{
    try {
      const response=await hotelModel.updateOne(
        {
          _id:hotel_id
        },
        {
            $push:{
              images: {
                $each: imagePathArray,
              }     
            }
        }
      )

      console.log(response)
      resolve(response)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

const findHotelByLocationHelper=(location,collisions,roomType,priceRange)=>{
    console.log(priceRange)
    console.log('priceRange')
  return new Promise(async (resolve,reject)=>{
    console.log('roomType=======>>>>>'+roomType)
    try {
      const response=await hotelModel.find(
        {
          $and:[
            {location:{'$regex':`${location}`,'$options':'i'}},
            {roomType:roomType},
            { 
              $and: [
                { price: { $gte: priceRange.min } }, // min price
                { price: { $lte: priceRange.max } }  // max price
              ]
            }
          ]
        },
        );

      console.log(response)
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

const getRatingOfAHotelHelper=async (hotel_id)=>{
  try {
    const response=await roomModel.aggregate([
      {
        $match: { hotel_id: hotel_id } // Optionally match specific hotel_id if needed
      },
      {
        $group:{
        _id:'$hotel_id',
        
         rooms:{$push:'$$ROOT'}
        }
      },
      {
        
      }
    ])

    console.log(response)
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

const getAllHotelIdsHelper= async (owner_id) => {
  try {
    const response=await hotelModel.aggregate([
      {
        $match:{
          owner_id:new mongoose.Types.ObjectId(owner_id)
        }
      },
      {
        $project:{
          _id:1
        }
      },
      {
        $group:{
          _id:null,
          hotelIds:{$push:'$_id'}
        }
      }
    ])

    return response[0].hotelIds
  } catch (error) {
    throw error
  }
}



module.exports = {
  uploadImages,
  getAHotelHelper,
  saveHotelDocumentHelper,
  getHotelsHelper,
  editHotelHelper,
  getAllHotelDetailsHelper,
  deleteHotelImageHelper,
  changeHotelStatusHelper,
  getAllHotelsForUserHelper,
  getAHotelForUserHelper,
  getAllHotelsForAdminHelper,
  editHotelNameHelper,
  editHotelLocationHelper,editHotelDescriptionHelper,
  addHotelImagesHelper,getAHotelHelperForOrder,
  findHotelByLocationHelper,
  getRatingOfAHotelHelper,
  getAllHotelsLengthHelper,
  getAllHotelForAdminLengthHelper,
  getAllHotelIdsHelper
};
