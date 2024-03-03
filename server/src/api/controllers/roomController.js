const {
  addRoomHelper,
  addRoomToHotel,
  getRoomsHelper,
  editRoomHelper,
  groupRoomByType,
  editRoomDescriptionHelper,
  addRoomImagesHelper,
  getAllRoomsOfAHotelForUserHelper,
  getAllRoomsOfAHotelForUserHelperByAvailabilty,
  getAvgReviewOfARoomHelper,
  getARoomHelper,
  findNoOfRoomsAvailableHelper,
  getRoomsByLocationHelper,
  getHotelRoomsByLocationHelper,
  filterRoomsByLocationHelper,
  updateRoomNumberHelper,
  changeRoomNumberHelper,
} = require("../helpers/roomHelper");
const mongoose=require('mongoose');
const { uploadImages } = require("../helpers/hotelHelper");

const addRoom = async (req, res, next) => {
  try {
    
    const hotelImgArray = await uploadImages(req.files);
    console.log(process.env.IMAGE_BASE_URL);
    let imgBaseUrlLength = process.env.IMAGE_BASE_URL.length;

    let imgStringArr = [];
    for (var i = 0; i < hotelImgArray.length; i++) {
      imgStringArr.push(hotelImgArray[i].public_id + ".png");
    }

    req.body.images = imgStringArr;
    const response = await addRoomHelper(req.body);

    res.status(200).json({ response });
  } catch (error) {
    console.log("id errorrr");
    console.log(error);
    res.status(400).json({ error });
  }
};

const editRoom = async (req, res, next) => {
console.log('sdlkdskjlkl')
  let hotel_id = req.params.hotel_id;
  let room_id = req.params.room_id;
  let files = req.files;

  try {

    const hotelImgArray = await uploadImages(files);

    let imgStringArr = [];
    for (var i = 0; i < hotelImgArray.length; i++) {
      imgStringArr.push(hotelImgArray[i].public_id + ".png");
    }

    const response = await editRoomHelper(hotel_id,room_id,req.body,imgStringArr);

    res.status(200).json({ response });
  } catch (error) {
    res.status(200).json({ error });
  }
};

const getRooms = async (req, res, next) => {
  
  try {
    const hotel_id = req.params.hotel_id;
    const response = await getRoomsHelper(hotel_id);
    res.status(200).json({ response });
  } catch (error) {
    res.status(404).json({ error });
  }
};


const getRoomsByType=async (req,res,next) => {
  let hotel_id=req.params.hotel_id
    try {
      console.log(res.cookies)
        const response=await groupRoomByType(hotel_id)
        res.status(200).json({response})
    } catch (error) {
      console.log(error)
      res.status(404).json({error})
    }
}

const editRoomDescription=async (req,res,next)=>{
  const room_id=req.params.room_id;
  const description=req.body.description;
    try {

      const response=await editRoomDescriptionHelper(room_id,description)
      
      res.status(200).json({response})
    } catch (error) {
      console.log(error)
      res.status(404).json({error})
    }
}

const updateRoomNumber = async (req,res) =>{
  const room_id=req.params.room_id;
  const noOfRooms=req.body.noOfRooms;
  try {
    const response=await changeRoomNumberHelper(room_id,noOfRooms)
    res.status(200).json({response})
  } catch (error) {
    console.log(error)
    res.status(500).json({error})
  }
}

const addRoomImages= async (req,res,next)=>{
  console.log(req.params)
    const room_id=req.body.room_id;
    try {
  
      console.log(req.files)
      const roomImgArray=await uploadImages(req.files)
        
      let imgStringArr=[]
      for(var i=0;i<roomImgArray.length;i++){
        imgStringArr.push(roomImgArray[i].public_id+'.png')
      }
      console.log(imgStringArr)
      const response=await addRoomImagesHelper(room_id,imgStringArr)
   
      res.status(200).json({response})
    } catch (error) {
      console.log(error)
      res.status(404).json({error})
    }
  }

const getRoomsForUser= async (req,res,next) => {

  const hotel_id=req.params.hotel_id
  try {
  const response=await getAllRoomsOfAHotelForUserHelperByAvailabilty(hotel_id,res.locals.existingCollisions)
  res.status(200).json({response})

  } catch (error) {
    console.log(error)  
  }
}


const getAvgReviewOfRoom= async (req,res)=>{
  let room_id=req.params.room_id
  try {
  const response =  await getAvgReviewOfARoomHelper(room_id)
  } catch (error) {
    res.status(500).json({error})
  }
}

const getARoomForUser=async (req,res)=>{
  const room_id=req.params.room_id;
  const checkInDate = req.query.checkIn || null;
  const checkOutDate = req.query.checkOut || null;
  const newCheckIn = new Date(checkInDate);
  const newCheckOut = new Date(checkOutDate);
  // console.log('res.lcoales') 
  // console.log(res.locals.collisions)
  // console.log('res.lcoales') 
  // const findRoom=res.locals.collisions.filter((el,index)=>{
  //   console.log(el.room_id,room_id)
  //  // return el.room_id.equals(new mongoose.Types.ObjectId(room_id))
  // })
  // console.log(findRoom)
  // console.log('this is find room')
  // const totalAvailableRoom=findRoom[0].no_of_rooms_available-findRoom[0].no_of_rooms_unavailabe_for_the_time_period


try {

  console.log('get a roommmm')
  const totalNoOfRoomsAvailable=await findNoOfRoomsAvailableHelper(room_id,newCheckIn,newCheckOut)

  // const noOfRoomsAvailable=await findNoOfRoomsAvailableHelper(room_id)
  const response=await getARoomHelper(room_id)
  res.status(200).json({response,totalAvailableRoom:totalNoOfRoomsAvailable})
} catch (error) {
  console.log(error)
  res.status(500).json({error})
}  
}

const checkAvailabilityOfRoom=async (req,res)=>{
  const room_id=req.params.room_id || null;
  const checkInDate = req.query.checkIn || null;
  const checkOutDate = req.query.checkOut || null;
  console.log(checkInDate,checkOutDate,'checkIn unparsed')
  const newCheckIn = new Date(checkInDate);
  const newCheckOut = new Date(checkOutDate);
console.log(newCheckIn,newCheckOut,'checkIndate','checkoutdate')

  try {
    // const room_id=req.params.room_id;
    // console.log('res.lcoales') 
    // console.log(room_id)
    // console.log(res.locals)
    // console.log(res.locals.collisions)
    // console.log('res.lcoales') 
    // const findRoom=res.locals.collisions.filter((el,index)=>{
    //   return el.room_id.equals(new mongoose.Types.ObjectId(room_id))
    // })
    // console.log(findRoom)
    // console.log('this is find room')
    // const totalAvailableRoom=findRoom[0].no_of_rooms_available-findRoom[0].no_of_rooms_unavailabe_for_the_time_period
    const totalNoOfRoomsAvailable=await findNoOfRoomsAvailableHelper(room_id,newCheckIn,newCheckOut)



    res.status(200).json({totalAvailableRoom:totalNoOfRoomsAvailable})
  //const response =await findNoOfRoomsAvailableHelper(room_id)
  } catch (error) {
    console.log(error)
    res.status(500).json({error})
  }
}


const getRoomsByLocation=async (req,res)=>{
  
  try {
    const response=await getRoomsByLocationHelper()
    res.status(200).json({response});
  } catch (error) {
    res.status(500).json({error})
  }
}


const filterRoomsByLocation=async (req,res)=>{
  const location=req.params.location;
  const collisions = res.locals.existingCollisions;
  try {
    console.log(location)
    console.log(collisions)
    const response=await filterRoomsByLocationHelper(location,collisions)
    res.status(200).json({response});
  } catch (error) {
    res.status(500).json({error})
  }
}

const getHotelRoomsByLocation=async (req,res)=>{
  try {
    const location=req.params.location;
   const response=await getHotelRoomsByLocationHelper(location)
   res.status(200).json({response}) 
  } catch (error) {
    res.status(500).json({error})
  }
}

module.exports = {
  addRoom,editRoom,
  getRooms,getRoomsByType,
  editRoomDescription,addRoomImages,
  getRoomsForUser,getAvgReviewOfRoom,
  getARoomForUser,checkAvailabilityOfRoom,getRoomsByLocation,
  getHotelRoomsByLocation,filterRoomsByLocation,updateRoomNumber
};
