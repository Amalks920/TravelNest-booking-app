const bookingModel=require('../models/bookingModel')
const roomModel=require('../models/roomModel')

const mongoose=require('mongoose')

const createBookingHelper=(data,totalPrice,checkInDate,checkOutDate,totalNoRooms,roomInfo,discountAmount,paymentMethod)=>{
    
    const roomDetails=data[0]
    const userDetails=data[1]
    const hotelDetails=data[2]

    const dataToPassToDb={
        userId:userDetails._id,
        userName:userDetails.username,
        userEmail:userDetails.email,
        userPhone:userDetails.phone,
        hotel_id:hotelDetails._id,
        hotelName:hotelDetails.hotelName,
        roomDetails:roomDetails,
        totalAmount:totalPrice,
        checkIn:checkInDate,
        checkOut:checkOutDate,
        totalNoOfRooms:totalNoRooms,
        discountAmount:discountAmount,
        payementType:paymentMethod
    }

    return new Promise(async (resolve,reject)=>{
        try {

        const response=await bookingModel.create(dataToPassToDb)
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}

const findABookingHelper=(booking_id)=>{
    return new Promise(async(resolve,reject)=>{
        try {
        const response=await bookingModel.findOne({_id:booking_id})
        resolve(response) 
        } catch (error) {
            reject(error)
        }
    })

}


const changePaymentStatus=(status)=>{
    return new Promise( async (resolve,reject)=>{
        try {
          const response=await  bookingModel.updateOne(
            {}
            )
        } catch (error) {
            reject(error)
        }
    })
}

const getAllBookingsHelper= async (hotel_id,pageNumber)=>{
 console.log(pageNumber)
        try {
            const response=await bookingModel.find({hotel_id:hotel_id}).sort({_id:-1}).skip((pageNumber-1)*4).limit(4)
            response.reverse()
            console.log(response)
            console.log('responsee')
            return response
            
        } catch (error) {
            return error
        }
}

const getAllHotelBookingsHelper=async (pageNumber)=>{
    try {
        const response=await bookingModel.find({}).skip((pageNumber-1)*4).limit(4)
        return response
    } catch (error) {
        throw error
    }
}
const getAllHotelBookingsLengthHelper=async (pageNumber)=>{
    try {
        const response=(await bookingModel.find({})).length
        return response
    } catch (error) {
        throw error
    }
}


const getAllBookingsOfHelper=async(user_id,pageNumber)=>{
    // return new Promise(async (resolve,reject)=>{
        try {
            console.log(user_id)
        const response=await bookingModel.aggregate([
           {
            $match:{
                userId:new mongoose.Types.ObjectId(user_id)
            }
           },
           {
            $sort: {
              _id: -1
            }
          },
           {
            $lookup:{
                from:'hotels',
                localField:'hotel_id',
                foreignField:'_id',
                as:'hotel_details'
            }
           },
           {
            $unwind:'$hotel_details'
           },
           {
            $project:{
                hotelName:1,
                checkIn:1,
                checkOut:1,
                hotelImages:'$hotel_details.images',
                totalAmount:1,
                status:1,
                totalNoOfRooms:1
            }
           },
           {
            $skip:(pageNumber-1)*3
           },
           {
            $limit:3
           }
        ])
        // find({userId:user_id})
            return response
        } catch (error) {
            throw error
        }
    // })
}

const getUserBookingDocumentLengthHelper=async (user_id)=>{
    try {
    const response=await bookingModel.find({userId:user_id})
    console.log(response.length)
    console.log('response')
    return response.length    
    } catch (error) {
        throw error
    }
}

const getABookingForUserHelper=(booking_id)=>{
    return new Promise(async (resolve,reject)=>{
        try {
        const response=await bookingModel.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(booking_id)
                }
            },
            {
                $lookup:{
                    from:'hotels',
                    localField:'hotel_id',
                    foreignField:'_id',
                    as:'hotel_details'
                }
               },
               {
                $unwind:'$hotel_details'
               }
        ])
        console.log(response)
        resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

const getABookingForOwnerHelper=(booking_id)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const response=await bookingModel.aggregate([
                {
                    $match:{
                        _id:new mongoose.Types.ObjectId(booking_id)
                    }
                }
            ])
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

const changeBookingStatusHelper=(booking_id,status)=>{
    console.log(status)
    return new Promise( async (resolve,reject)=>{
        try {
            const response=await bookingModel.updateOne(
                {_id:booking_id},
                {
                    $set:{
                        status:status
                    }
                }
                )
                console.log(response)
            resolve(response)   
        } catch (error) {
            reject(error)
        }
    })
}

const cancelBookingHelper=(booking_id,status,totalNoOfRooms)=>{

    return new Promise( async (resolve,reject)=>{
        try {
        const response=await bookingModel.updateOne(
            {_id:booking_id},
            {
                $set:{
                    status:status
                }
            }
            );
        
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

const updateNoOfRoomsHelper=(roomDetails)=>{
    console.log(roomDetails)
    return new Promise(async (resolve,reject)=>{

        try {
            for (const room of roomDetails) {
                const { _id, noOfRooms } = room;
                const filter = { _id: _id };
                const updateDoc = { $inc: { no_of_rooms_available: noOfRooms } };
                const result = await roomModel.updateOne(filter, updateDoc);
                console.log(result)
               // console.log(`Document with ID ${id} updated successfully`);
               resolve(result)
            } 
        } catch (error) {
           reject(error) 
        }
    })
}


const getAllBookingsLengthHelper=async (hotel_id)=>{
    try {
    const response=await bookingModel.find({hotel_id:hotel_id})

    return response.length; 
    } catch (error) {
        return error
    }
}

module.exports={
    createBookingHelper,changePaymentStatus,
    getAllBookingsHelper,getAllBookingsOfHelper,
    getABookingForUserHelper,getABookingForOwnerHelper,
    changeBookingStatusHelper,cancelBookingHelper,findABookingHelper,
    updateNoOfRoomsHelper,getUserBookingDocumentLengthHelper,
    getAllBookingsLengthHelper,getAllHotelBookingsHelper,
     getAllHotelBookingsLengthHelper

}