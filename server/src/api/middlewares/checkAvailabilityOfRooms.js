const bookingModel = require("../models/bookingModel");
const roomModel = require("../models/roomModel");

const checkAvailabilityOfRooms = async (req, res, next) => {

  const checkInDate = req.body.checkInDate || null;
  const checkOutDate = req.body.checkOutDate || null;
  const newCheckIn = new Date(checkInDate);
  const newCheckOut = new Date(checkOutDate);

  try {
    const existingCollisions = await bookingModel.find({
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
    });

    let existingCollisionIdArray = [];

    existingCollisions.forEach((booking, index) => {
      existingCollisionIdArray.push(booking?.roomDetails[0]?._id);
    });

    const filteredExistingCollisionIdArray = [];

    filteredExistingCollisionIdArray.push(existingCollisionIdArray[0]);
    console.log(filteredExistingCollisionIdArray);
    for (var i = 0; i < existingCollisionIdArray.length; i++) {
      let isExist = filteredExistingCollisionIdArray.find(
        (element) => element === existingCollisionIdArray[i]
      );

      if (!isExist) {
        filteredExistingCollisionIdArray.push(existingCollisionIdArray[i]);
      }
    }
    console.log(filteredExistingCollisionIdArray);

    const arr = [];

    for (var i = 0; i < filteredExistingCollisionIdArray.length; i++) {
      const res = await roomModel.findOne({
        $and: [
          { _id: filteredExistingCollisionIdArray[i] },
          { no_of_rooms_available: { $eq: 0 } },
        ],
      });

      if (res) arr.push(filteredExistingCollisionIdArray[i]);

    }

    res.locals.existingCollisions = arr || [];
    next();
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = checkAvailabilityOfRooms;
