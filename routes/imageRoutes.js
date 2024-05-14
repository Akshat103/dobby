const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/multerConfig')

// Image routes
router.post('/add', authMiddleware, upload.single('image'), imageController.uploadImage);
router.get('/all', authMiddleware, imageController.getAllImagesByFolderId);

module.exports = router;
