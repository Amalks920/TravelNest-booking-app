const multer = require('multer')
const path=require('path')

const storage = multer.diskStorage({
	destination: 'public/images/uploads/',

	filename: function (req, file, callback) {
		const extension = path.extname(file.originalname)
		const uniqueSuffix = new Date().toISOString().replace(/[-:.]/g, '')
		callback(null, file.fieldname + '-' + uniqueSuffix + '-' + Math.round(Math.random() * 1e9) + extension)
	},
})



module.exports = multer({ storage })