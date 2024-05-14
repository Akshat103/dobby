const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function(req, file, cb) {
    const { name } = req.body;
    const uniqueSuffix = crypto.randomBytes(8).toString('hex');
    const ext = path.extname(file.originalname);
    cb(null, name.split('.')[0] + '-%-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;