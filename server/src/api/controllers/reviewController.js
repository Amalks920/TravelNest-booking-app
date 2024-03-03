const { uploadImages } = require("../helpers/hotelHelper");
const { addReviewHelper, findReviewsOfHotelByHotelIdHelper } = require("../helpers/reviewHelper");

const addReview = async (req, res, next) => {
  try {
    const files = req.files;
    console.log(files);
    const reviewImgArray = await uploadImages(files);

    let imgStringArr = [];
    for (var i = 0; i < reviewImgArray.length; i++) {
      imgStringArr.push(reviewImgArray[i].public_id + ".png");
    }
    req.body.images = imgStringArr;

    const response = await addReviewHelper(req.body);

    res.status(200).json({ response });
  } catch (error) {
    res.status(404).json({ error });
  }
};

const getReviewOfAHotelForUser = async (req,res,next) => {
    const hotel_id=req.params.hotel_id;
    try {
        const response=await findReviewsOfHotelByHotelIdHelper(hotel_id);
        res.status(200).json({response})
    } catch (error) {
       res.status(404).json({error}) 
    }
}

const getReviewOfAHotelForAdmin = async (req, res, next) => {
  const hotel_id = req.params.hotel_id;
  
  try { 
      const response = await findReviewsOfHotelByHotelIdHelper(hotel_id);
      res.status(200).json({ response });
  } catch (error) {
      res.status(404).json({ error });
  }
};

module.exports = {
  addReview,getReviewOfAHotelForUser,
  getReviewOfAHotelForAdmin
};
