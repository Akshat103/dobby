const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');
const authMiddleware = require('../middlewares/authMiddleware');

// Folder routes
router.post('/create', authMiddleware, folderController.createFolder);
router.post('/all', authMiddleware, folderController.getAllFolders);

module.exports = router;
