const roomModel = require("../models/roomModel");
const hotelModel = require("../models/hotelModel");
const { default: mongoose } = require("mongoose");
const { resolve } = require("path");
const bookingModel = require("../models/bookingModel");

const addRoomHelper = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await roomModel.create(data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const addRoomToHotel = (hotel_id, room_id) => {

  return new Promise(async (resolve, reject) => {
    try {
      const res = await hotelModel.updateOne(
        { _id: hotel_id },
        { $push: { room_id: room_id } }
      );
      resolve(res);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const getRoomsHelper = (hotel_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await roomModel.find({ hotel_id: hotel_id });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const editRoomHelper = (hotel_id, room_id, data, imgPathArr) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await roomModel.updateOne(
        { _id: room_id },
        {
          $set: {
            data,
          },
          $push: {
            images: {
              $each: imgPathArr,
            },
          },
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

const groupRoomByType = (hotel_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await roomModel.aggregate([
        {
          $match: {
            hotel_id: new mongoose.Types.ObjectId(hotel_id),
          },
        },
        {
          $group: {
            _id: "$roomType",
            rooms: {
              $push: {
                id: "$_id",
                description: "$description",
                size: "$size",
                amenities: "$amenities",
                noOfRooms: "$noOfRooms",
                bathRoomType: "$bathroomType",
                images: "$images",
                rate: "$rate",
                createdAt: "$createdAt",
              },
            }, // Include only the fields you need
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 1, // Exclude the _id field if you don't need it
            roomType: "$_id",
            description: "$rooms.description",
            size: "$rooms.size",
            amenities: "$rooms.amenities",
            noOfRooms: "$rooms.noOfRooms",
            bathRoomType: "$rooms.bathRoomType",
            images: "$rooms.images",
            rate: "$rooms.rate",
            createdAt: "$rooms.createdAt",
            rooms: 1, // Include the 'rooms' field
            count: 1, // Include the 'count' field
          },
        },
      ]);
      console.log(response);
      resolve(response);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const findRoomsInHotelHelper = (hotel_id) => {
  console.log("entered room helper");
  return new Promise(async (resolve, reject) => {
    try {
      console.log(hotel_id);
      const response = await roomModel.find({ hotel_id: hotel_id });
      console.log(response);
      console.log("response room model");
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const changeAllRoomStatus = (hotel_id, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await roomModel.updateMany(
        { hotel_id: hotel_id },
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

const getAllRoomsOfAHotelForUserHelper = (hotel_id, collisions) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const response=await roomModel.find(
      //   {
      //     hotel_id:hotel_id
      //   }
      //   {
      //     $and:[
      //       {
      //         hotel_id:hotel_id
      //       },
      //       {
      //         status:'listed'
      //       }
      //     ]
      //   }
      // )

      const response = await roomModel.aggregate([
        {
          $match: {
            // hotel_id: new mongoose.Types.ObjectId(hotel_id),
            $and: [
              {
                hotel_id: new mongoose.Types.ObjectId(hotel_id),
              },
              // {
              //   _id: {$nin:collisions}
              // }
            ],
          },
        },
        {
          $group: {
            _id: "$roomType",
            rooms: {
              $push: {
                id: "$_id",
                description: "$description",
                size: "$size",
                hotel_id: "$hotel_id",
                amenities: "$amenities",
                noOfRooms: "$noOfRooms",
                bathRoomType: "$bathroomType",
                images: "$images",
                rate: "$rate",
                createdAt: "$createdAt",
              },
            }, // Include only the fields you need
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 1, // Exclude the _id field if you don't need it
            roomType: "$_id",
            // description:'$rooms.description',
            // size:'$rooms.size',
            // amenities:'$rooms.amenities',
            // noOfRooms:'$rooms.noOfRooms',
            // bathRoomType:'$rooms.bathRoomType',
            // images:'$rooms.images',
            // rate:'$rooms.rate',
            // createdAt:'$rooms.createdAt',
            rooms: 1, // Include the 'rooms' field
            count: 1, // Include the 'count' field
          },
        },
      ]);

      resolve(response);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const getAllRoomsOfAHotelForUserHelperByAvailabilty = (
  hotel_id,
  collisions
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await roomModel.aggregate([
        {
          $match: {
            // hotel_id: new mongoose.Types.ObjectId(hotel_id),
            $and: [
              {
                hotel_id: new mongoose.Types.ObjectId(hotel_id),
              },
              {
                _id: { $nin: collisions },
              },

            ],
          },
        },

        {
          $group: {
            _id: "$roomType",
            rooms: {
              $push: {
                id: "$_id",
                description: "$description",
                size: "$size",
                hotel_id: "$hotel_id",
                amenities: "$amenities",
                noOfRooms: "$noOfRooms",
                bathRoomType: "$bathroomType",
                roomType:'$roomType',
                images: "$images",
                rate: "$rate",
                createdAt: "$createdAt",
              },
            }, // Include only the fields you need
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 1, // Exclude the _id field if you don't need it
            roomType: "$_id",
            // description:'$rooms.description',
            // size:'$rooms.size',
            // amenities:'$rooms.amenities',
            // noOfRooms:'$rooms.noOfRooms',
            // bathRoomType:'$rooms.bathRoomType',
            // images:'$rooms.images',
            // rate:'$rooms.rate',
            // createdAt:'$rooms.createdAt',
            rooms: 1, // Include the 'rooms' field
            count: 1, // Include the 'count' field
          },
        },
      ]);

      resolve(response);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const editRoomDescriptionHelper = (room_id, description) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await roomModel.updateOne(
        { _id: room_id },
        {
          $set: {
            description: description,
          },
        }
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};



const getRoomDetailsByIdHelper = (roomIds) => {
  // roomId
  // priceRoom
  // roomType
  // noOfPeopleAllowed
  return new Promise(async (resolve, reject) => {
    try {
      const roomDetails = await roomModel.find(
        {
          _id: roomIds,
        },
        {
          _id: 1,
          rate: 1,
          roomType: 1,
          noOfPeopleAllowed: 1,
        }
      );

      resolve(roomDetails);
    } catch (error) {
      reject(error);
    }
  });
};

const addRoomImagesHelper = (room_id, imagePathArray) => {
  console.log(room_id);
  console.log(imagePathArray);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await roomModel.updateOne(
        {
          _id: room_id,
        },
        {
          $push: {
            images: {
              $each: imagePathArray,
            },
          },
        }
      );
      console.log(response);
      resolve(response);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const searchRoomsHotel = async (location, collisions, priceRange, roomType,amenities) => {
console.log(amenities)
console.log('amenities')
if(!roomType) console.log(true)


  const matchQuery= {
    $and: [
      {
        location: {
          $regex: `${location}`,
          $options: "i",
        },
      },
      {
        _id: {
          $nin: collisions,
        },
      },

      { rate: { $gte: Number(priceRange?.min) || 0 } }, // min price

      { rate: { $lte: Number(priceRange?.max) || Number.MAX_SAFE_INTEGER } }, // max price

        { roomType: roomType },
    

    ],
  }
  // const matchQuery2= {
  //   $and: [
  //     {
  //       location: {
  //         $regex: `${location}`,
  //         $options: "i",
  //       },
  //     },
  //     {
  //       _id: {
  //         $nin: collisions,
  //       },
  //     },

  //     // { rate: { $gte: Number(priceRange?.min) || 0 } }, // min price

  //     // { rate: { $lte: Number(priceRange?.max) || Number.MAX_SAFE_INTEGER } }, // max price

  //     //   { roomType: roomType },

  //   ],
  // }

  const pipeline=[
    {
      $lookup: {
        from: "hotels",
        localField: "hotel_id",
        foreignField: "_id",
        as: "hotelDetails",
      },
    },
    {
      $lookup: {
        from:'reviews',
        localField:'_id',
        foreignField:'room_id',
        as:'reviewDetails'
      }
    },
    {
      $unwind: "$hotelDetails",
    },
    {
      $match: {
        "hotelDetails.status": "listed",
      },
    },
    {
      $project: {
        _id: 1,
        roomType: 1,
        description: 1,
        size: 1,
        amenities: 1,
        rate: 1,
        hotel_id: 1,
        images: 1,
        bathroomType: 1,
        rate: 1,
        hotelName: "$hotelDetails.hotelName",
        hotelDescription: "$hotelDetails.description",
        hotelImages: "$hotelDetails.images",
        location: "$hotelDetails.location",
        reviewDetails:1
      },
    },

    {
      $match:matchQuery
    },
  ]






  if(collisions.length!=0 && roomType!=null){
   
    matchQuery.$and.push(
            {
        _id: {
          $nin: collisions,
        },
      },
      { roomType: roomType },

      );

    // pipeline.push(
    //   { roomType: roomType }
    // )
  }
    try {
   
      const response = await roomModel.aggregate(
        pipeline
      );

      return response
    } catch (error) {
      return error
     
    }
};

const getARoomHelper= async (room_id)=>{
  try {
    const response=await roomModel.find({_id:room_id})

    return response
  } catch (error) {
      return error
  }
}

const findNoOfRoomsAvailableHelper=async (room_id,newCheckIn,newCheckOut) => {
try {
  console.log(room_id)
  const response = await bookingModel.aggregate([

    {
      $match: {
        $or: [
          {
            $and: [
              { checkIn: { $lt: newCheckIn } },
              { checkOut: { $gt: newCheckIn } },
            ],
          },
          {
            $and: [
              { checkIn: { $lt: newCheckOut } },
              { checkOut: { $gt: newCheckOut } },
            ],
          },
          {
            $and: [
              { checkIn: { $gte: newCheckIn } },
              { checkOut: { $lte: newCheckOut } },
            ],
          },
        ],
      },
    },
    {
      $match:{
        "roomDetails.0._id":new mongoose.Types.ObjectId(room_id)
      }
    }
  ]);

 const totalNoOfRooms= response?.reduce((acc,curr)=>{
  console.log(curr)
    return acc+Number(curr?.roomDetails[0]?.noOfRooms || 0)
  },0)

  const roomRes=await roomModel.find({_id:room_id});
  console.log(roomRes)
  console.log('roomRes')
  console.log(roomRes[0]?.noOfRooms - totalNoOfRooms)
  return roomRes[0]?.noOfRooms-totalNoOfRooms
} catch (error) {
  throw error
}
}

const decreaseRoomsCount = (rooms) => {
  return new Promise(async (resolve, reject) => {
    try {
      for (var i = 0; i < rooms.roomDetails.length; i++) {
        const response = await roomModel.updateOne(
          { _id: rooms.roomDetails[i].id },
          {
            $inc: {
              no_of_rooms_available: -Number(rooms.roomDetails[i].noOfRooms),
            },
          }
        );
      }

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

const updateRoomNumberHelper = (room_id, noOfRooms) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await roomModel.updateOne(
        { _id: room_id },
        {
          $inc: {
            no_of_rooms_available: -noOfRooms,
          },
        }
      );
      console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const changeRoomNumberHelper = (room_id, noOfRooms) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await roomModel.updateOne(
        { _id: room_id },
        {
          $set: {
            noOfRooms: Number(noOfRooms),
          },
        }
      );
      console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const getAvgReviewOfARoomHelper=async (room_id)=>{
  try {
   
  } catch (error) {
    return error
  }
}

const getRoomsByLocationHelper=async (location) =>{
  try {
    const response = await roomModel.aggregate([

      {
        $lookup: {
          from: 'hotels',
          localField: 'hotel_id',
          foreignField: '_id',
          as: 'hotel_details'
        }
      },
      {
        $unwind: '$hotel_details'
      },
      {
        $project: {
          hotelName: 1,
          checkIn: 1,
          checkOut: 1,
          hotelImages: '$hotel_details.images',
          totalAmount: 1,
          status: 1,
          totalNoOfRooms: 1,
          location: { $toLower: '$hotel_details.location' } // Convert location to lowercase
        }
      },
      {
        $group: {
          _id: '$location', // Group by lowercase location
          hotelImages: { $addToSet: '$hotelImages' }
        }
      }
    ]);
    
    return response
  } catch (error) {
    throw error
  }
}

const filterRoomsByLocationHelper=async (location,collisions)=>{
try {
  const response=await roomModel.aggregate([
    {
      $lookup: {
        from: "hotels",
        localField: "hotel_id",
        foreignField: "_id",
        as: "hotelDetails",
      },
    },
    {
      $unwind: "$hotelDetails",
    },
    {
      $match: {
        "hotelDetails.status": "listed",
      },
    },



    {
      $project: {
        _id: 1,
        roomType: 1,
        description: 1,
        size: 1,
        amenities: 1,
        rate: 1,
        hotel_id: 1,
        images: 1,
        bathroomType: 1,
        rate: 1,
        hotelName: "$hotelDetails.hotelName",
        hotelDescription: "$hotelDetails.description",
        hotelImages: "$hotelDetails.images",
        location: "$hotelDetails.location",
      },
    },
    {
      $match:{
        $and: [
          {
            location: {
              $regex: `${location}`,
              $options: "i",
            },
          },
          {
            _id: {
              $nin: collisions,
            },
          },
        ]    
      }
    }
  ])
  return response
} catch (error) {
  throw error
}
}

const getHotelRoomsByLocationHelper= async (location) => {
  try {
    const response=await roomModel.aggregate([
    {
      $lookup:{
        from:'hotels',
        localField:'hotel_id',
        foreignField:'_id',
        as:'hotelDetails'
      }
    },
    // {
    //   $match:{
    //     'hotelDetails.0.location':location
    //   }
    // }
    {
      $unwind:'$hotelDetails'
    },
    {
      $project: {
        _id: 1,
        roomType: 1,
        description: 1,
        size: 1,
        amenities: 1,
        rate: 1,
        hotel_id: 1,
        images: 1,
        bathroomType: 1,
        rate: 1,
        hotelName: "$hotelDetails.hotelName",
        hotelDescription: "$hotelDetails.description",
        hotelImages: "$hotelDetails.images",
        location: "$hotelDetails.location",
      },
    },
  ]);


  console.log(response);
  
  return response;
  } catch (error) {
    throw error
  }
}

module.exports = {
  addRoomHelper,
  addRoomToHotel,
  getRoomsHelper,
  editRoomHelper,
  groupRoomByType,
  findRoomsInHotelHelper,
  changeAllRoomStatus,
  getAllRoomsOfAHotelForUserHelper,
  editRoomDescriptionHelper,
  getRoomDetailsByIdHelper,
  addRoomImagesHelper,
  getAllRoomsOfAHotelForUserHelperByAvailabilty,
  searchRoomsHotel,
  decreaseRoomsCount,
  updateRoomNumberHelper,
  getAvgReviewOfARoomHelper,
  getARoomHelper,
  findNoOfRoomsAvailableHelper,
  getRoomsByLocationHelper,
  getHotelRoomsByLocationHelper,
  filterRoomsByLocationHelper,
  changeRoomNumberHelper
};
