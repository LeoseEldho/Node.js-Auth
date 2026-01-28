const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null,"uploads/")
    },
    filename: function (req, file, cb) {
        cb(null,file.fieldname+Date.now()+path.extname(file.originalname ))   
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null,true)
    } else {
        cb(new Error("Not an Image"))
    }
};

const uploadImageMiddleWare = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});


module.exports =  uploadImageMiddleWare ;