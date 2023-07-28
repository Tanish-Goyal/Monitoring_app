const multer = require('multer');
const Constants = require('../utils/constants');

const multerStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
      cb(null, await Constants.uploadPath());
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
const upload = multer({ storage: multerStorage });

module.exports = upload;