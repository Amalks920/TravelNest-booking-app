const express = require('express');
const { searchController, roomSearchController, searchByHotelController } = require('../controllers/searchController');
const checkAvailability = require('../middlewares/checkAvailability');
const router = express.Router();



router.get('/',checkAvailability,roomSearchController);
router.get('/search-by-hotel',checkAvailability,searchByHotelController)

module.exports=router;