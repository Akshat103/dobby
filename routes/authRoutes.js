const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// User routes
router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);
router.post('/logout', authMiddleware, userController.logoutUser);

module.exports = router;
