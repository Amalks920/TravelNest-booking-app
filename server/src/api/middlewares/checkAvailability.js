const bookingModel = require("../models/bookingModel");
const roomModel = require("../models/roomModel");
const mongoose=require('mongoose')

const checkAvailability = async (req, res, next) => {

  const checkInDate = req.query.checkIn || null;
  const checkOutDate = req.query.checkOut || null;
  const newCheckIn = new Date(checkInDate);
  const newCheckOut = new Date(checkOutDate);

  try {
    // const existingCollisions = await bookingModel.find({
    //   $or: [
    //     {
    //       $and: [
    //         { checkIn: { $lt: newCheckIn } },
    //         { checkOut: { $gt: newCheckIn } },
    //       ],
    //     },
    //     {
    //       $and: [
    //         { checkIn: { $lt: newCheckOut } },
    //         { checkOut: { $gt: newCheckOut } },
    //       ],
    //     },
    //     {
    //       $and: [
    //         { checkIn: { $gte: newCheckIn } },
    //         { checkOut: { $lte: newCheckOut } },
    //       ],
    //     },
    //   ],
    // });

    const existingCollisions = await bookingModel.aggregate([
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
        $project:{
          roomDetails:1
        }
      },
      {
        $unwind:'$roomDetails'
      },
      {
        $lookup:{
          from:'rooms',
          localField:'roomDetails._id',
          foreignField:'_id',
          as:'roomInfo'
        }
      },
      {
        $unwind:'$roomInfo'
      },
      {
        $project:{
          room_id:'$roomDetails._id',
          no_of_rooms_unavailabe_for_the_time_period:'$roomDetails.noOfRooms',
          no_of_rooms_available:'$roomInfo.noOfRooms'
        }
      },
      
      // {
      //   $match: {
      //     $expr: {
      //       $eq: ['$no_of_rooms_unavailable_for_the_time_period', '$no_of_rooms_available'],
      //     },
      //   },
      // },
      // {
      //   $project:{
      //     _id:'$room_id'
      //   }
      // }
    ]);

  

    const  unavailableRooms=existingCollisions.filter((el,index)=>{
      return el.no_of_rooms_unavailabe_for_the_time_period===el.no_of_rooms_available
    })

   

    let collisionArray=[];
    unavailableRooms.map((el,index)=>{
      return collisionArray.push(el.room_id)
    })

  

    // return console.log('existing collision')


    // let existingCollisionIdArray = [];

    // existingCollisions.forEach((booking, index) => {
    //   console.log(booking?.roomDetails)
    //   existingCollisionIdArray.push(new mongoose.Types.ObjectId(booking?.roomDetails[0]?._id));
    // });

    // console.log(existingCollisionIdArray)
    // console.log('existing colllisions')
 

    // const filteredExistingCollisionIdArray = [];
    // filteredExistingCollisionIdArray.push(existingCollisionIdArray[0]);

    // for (var i = 0; i < existingCollisionIdArray.length; i++) {
    //   let isExist = filteredExistingCollisionIdArray.find(
    //     (element) => element.id.equals(existingCollisionIdArray[i])
    //   );

    //   if (!isExist) {
    //     filteredExistingCollisionIdArray.push(existingCollisionIdArray[i]);
    //   } else {
    //   }
    // }
    // console.log(filteredExistingCollisionIdArray)
    // const response=await roomModel.find({_id:filteredExistingCollisionIdArray}).select('_id noOfRooms')

   

    // for(var i=0;i<response.length;i++){
    //   if(findIfRoomNotAvailabe(response[i])===false){
    //     response.splice(i,1)
    //   }
    // }

    // function findIfRoomNotAvailabe(roomObj){
    //   let noOfDocumentsFound=0
    //   for(var i=0;i<existingCollisionIdArray.length;i++){
    //       if(roomObj.equals(existingCollisionIdArray[i].id)){
    //         noOfDocumentsFound=existingCollisionIdArray[i].noOfRooms
    //       }
    //   }
    //     console.log(existingCollisionIdArray)
    //     console.log('console.log=========z..')
    //   if(noOfDocumentsFound>=roomObj.noOfRooms){
    //      return true
    //   }else{
    //     return false
    //   }

    // }
    // console.log(response)
    // let responseArr=[]

    // for(var i=0;i<response.length;i++){
    //   responseArr.push(response[i]._id)
    // }

    // console.log(responseArr)
    // console.log('responsweeee')

    res.locals.collisions=existingCollisions;

    res.locals.existingCollisions = collisionArray;

    next();
  } catch (error) {
    console.log(error)
  }
};

module.exports = checkAvailability;
