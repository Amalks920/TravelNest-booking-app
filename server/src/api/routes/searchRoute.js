const express = require('express');
const { searchController, roomSearchController } = require('../controllers/searchController');
const checkAvailability = require('../middlewares/checkAvailability');
const router = express.Router();



router.get('/',checkAvailability,roomSearchController);

module.exports=router;