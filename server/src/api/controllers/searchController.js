const {
  findHotelByLocationHelper,
  searchHotels,
} = require("../helpers/hotelHelper");
const { searchRoomsHotel } = require("../helpers/roomHelper");

const searchController = async (req, res, next) => {
  try {
    const collisions = res.locals.existingCollisions;
    let location = req.query.location;
    let checkIn = req.query.checkIn || null;
    let checkOut = req.query.checkOut || null;
    const roomType = req.query.roomType || null;
    const min = req.query.priceMin || null;
    const max = req.query.priceMax || null;
    const priceRange = {
      min,
      max,
    };

    const response = await findHotelByLocationHelper(
      location,
      collisions,
      roomType,
      priceRange
    );

    res.status(200).json({ response });
  } catch (error) {
    res.status(404).json({ error });
  }
};

const roomSearchController = async (req, res, next) => {
  const amenities=req.query.aminities.split(',')
  const collisions = res.locals.existingCollisions;
  const c=res.locals.collisions

  const location = req.query.search; 
  const roomType = req.query.roomType || null;


  const min = req.query.min || null;
  const max = req.query.max || null;
  const priceRange = {
    min,
    max,
  };

  try {
    const response = await searchRoomsHotel(
      location,
      collisions,
      priceRange,
      roomType,
      amenities
    );
    console.log(response)
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
};

module.exports = {
  searchController,
  roomSearchController,
};
