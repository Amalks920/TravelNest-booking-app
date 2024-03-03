const { getHotelsHelper, getAHotelHelper, editHotelHelper, getAllHotelDetailsHelper, deleteHotelImageHelper, changeHotelStatusHelper, getAllHotelsForUserHelper, getAHotelForUserHelper, getAllHotelsForAdminHelper, editHotelNameHelper, editHotelLocationHelper, editHotelDescriptionHelper, addHotelImagesHelper, getRatingOfAHotelHelper, getAllHotelsLengthHelper, getAllHotelForAdminLengthHelper } = require("../helpers/hotelHelper")
const { saveHotelDocumentHelper } = require("../helpers/hotelHelper")
const { uploadImages } = require("../helpers/hotelHelper")
const { findReviewsOfHotelByHotelIdHelper } = require("../helpers/reviewHelper")
const { findRoomsInHotelHelper, changeAllRoomStatus, getAllRoomsOfAHotelForUserHelper } = require("../helpers/roomHelper")
const { getReviewOfAHotelForUser } = require("./reviewController")
require('dotenv').config()


const createHotel=async (req,res,next)=>{
  const {hotelName,description,location,owner_id}=req.body
    try {
      const hotelImgArray=await uploadImages(req.files)
      
      let imgStringArr=[]
      for(var i=0;i<hotelImgArray.length;i++){
        imgStringArr.push(hotelImgArray[i].public_id+'.png')
      }

      let data={
        hotelName,
        description,
        location,
        owner_id,
        images:imgStringArr
      }
      const response=await saveHotelDocumentHelper(data)
      console.log('rreeessspp=')
      console.log(response)
      res.status(200).json({response})
    } catch (error) {
       console.log(error) 
       res.status(404).json({error})
    }
}

const getAllHotels=async (req,res,next)=>{

  const userId=req.params.userId
  const pageNumber=req.query.pageNumber;
  try {
    const response=await getHotelsHelper(userId,pageNumber)
    res.status(200).json({response})
  } catch (error) {
    console.log(error.message)
    res.status(404).json({error})
  }
    
}

const getAllHotelsLength=async (req,res)=>{
  const userId=req.params.user_id
  try {
    const response=await getAllHotelsLengthHelper(userId)
    res.status(200).json({response});
  } catch (error) {
    res.status(500).json({error});
  }
}

const getAllHotelsForAdmin= async (req,res,next)=>{

  const pageNumber=req.params.pageNumber
try {
  const response=await getAllHotelsForAdminHelper(pageNumber)
  res.status(200).json({response})
} catch (error) {
  console.log(error)
  res.status(404).json({error})
}
}

const getAllHotelForAdminLength= async (req,res)=>{
  try {
    const response=await getAllHotelForAdminLengthHelper()
    res.status(200).json({response})
  } catch (error) {
    res.status(500).json({error})
  }
}

const getAHotel=async (req,res,next)=>{
  let hotel_id=req.params.hotel_id
  try {
    const response=await getAHotelHelper(hotel_id)
    res.status(200).json({response})
  } catch (error) {
    console.log(error)
    res.status(404).json({error})
  }
   
}

const getAllHotelDetails=async (req,res,next)=>{
  let hotel_id=req.params.hotel_id;

  try {
    const hotel_details=await getAllHotelDetailsHelper(hotel_id)
    const room_details=await findRoomsInHotelHelper(hotel_id)
    res.status(200).json({hotel_details,room_details})
  } catch (error) {
    console.log(error)
    res.status(404).json({error})
  }
}


const editHotel=async (req,res,next)=>{
  let hotel_id=req.params.hotel_id
  let files=req.files
  try {

    const hotelImgArray=await uploadImages(req.files)
      
    let imgStringArr=[]
    for(var i=0;i<hotelImgArray.length;i++){
      imgStringArr.push(hotelImgArray[i].public_id+'.png')
    }

    const response=await editHotelHelper(req.body,imgStringArr)
    res.status(200).json({response:true})
  } catch (error) {
    console.log(error)
    res.status(404).json({error})
  }
}

const deleteHotelImage=async (req,res,next)=>{
  const hotel_id=req.params.hotel_id;
  const img_public_id=req.params.img_public_id
  try {

    const response=await deleteHotelImageHelper(hotel_id,img_public_id)
    res.status(200).json({response});
  } catch (error) {
    res.status(404).json({error})
  }
}

const changeHotelStatus=async (req,res,next)=>{
  const hotel_id=req.params.hotel_id;
  const status=req.params.status;
  try {

      const response=await  changeHotelStatusHelper(hotel_id,status);

     // const changeRoomStatus=await changeAllRoomStatus(hotel_id,status)
     
      res.status(200).json({response})
  } catch (error) {
      res.status(404).json({error})
  }
}


const getAllHotelsForUser=async (req,res,next)=>{
  try {
    const response=await getAllHotelsForUserHelper()
    res.status(200).json({response})
  } catch (error) {
    res.status(404).json({error})
  }
}

const getAHotelForUser=async (req,res,next)=>{
  
  const hotel_id=req.params.hotel_id
  const room_id=req.params.room_id

  try {
    const hotels=await getAHotelForUserHelper(hotel_id)
    const rooms=await getAllRoomsOfAHotelForUserHelper(hotel_id)
    const reviews=await findReviewsOfHotelByHotelIdHelper(hotel_id,room_id);
   

    const response=await Promise.all([hotels,rooms,reviews])
    

    res.status(200).json({response})
  } catch (error) {
    console.log(error)
    res.status(404).json({error})
  }
}

const editHotelName=async (req,res,next)=>{
  const hotel_id=req.params.hotel_id
  const hotelName=req.body.hotelName
  try {
    const response=await editHotelNameHelper(hotel_id,hotelName)
    res.status(200).json({response})
  } catch (error) {
    console.log(error)
    res.status(404).json({error})
  }
}

const editHotelLocation= async (req,res,next)=>{
  console.log('hosijodijod')
const hotel_id=req.params.hotel_id;
const location=req.body.location;

try {
    const response=await editHotelLocationHelper(hotel_id,location)

    res.status(200).json({response})
} catch (error) {
  console.log(error)
    res.status(404).json({error})
}
}

const editHotelDescription= async (req,res,next)=>{

const hotel_id=req.params.hotel_id;
const location=req.body.description;

try {
    const response=await editHotelDescriptionHelper(hotel_id,location)

    res.status(200).json({response})
} catch (error) {
  console.log(error)
    res.status(404).json({error})
}
}

const addHotelImages= async (req,res,next)=>{
console.log(req.params)
  const hotel_id=req.body.hotel_id;
  try {


    const hotelImgArray=await uploadImages(req.files)
      
    let imgStringArr=[]
    for(var i=0;i<hotelImgArray.length;i++){
      imgStringArr.push(hotelImgArray[i].public_id+'.png')
    }
    console.log(imgStringArr)
    const response=await addHotelImagesHelper(hotel_id,imgStringArr)
 
    res.status(200).json({response})
  } catch (error) {
    console.log(error)
    res.status(404).json({error})
  }
}

const getRatingOfAHotel = async (req,res)=>{
  const hotel_id=req.params.hotel_id
  try {
    const response=await getRatingOfAHotelHelper(hotel_id) 
    res.status(200).json({response})
  } catch (error) {
    console.log(error)
    res.status(500).json({error});
  }
}


module.exports={
    createHotel,getAllHotels,
    getAllHotels,getAHotel,editHotel,
    getAllHotelDetails,deleteHotelImage,
    changeHotelStatus,getAllHotelsForAdmin,
    getAllHotelsForUser,getAHotelForUser,editHotelName,
    editHotelLocation,editHotelDescription,addHotelImages,
    getRatingOfAHotel,getAllHotelsLength,getAllHotelForAdminLength
}

