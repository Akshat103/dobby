const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const userController = {
  signupUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error('Username already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword });
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.cookie('token', token, { httpOnly: true });
      res.status(201).json({ message: 'User signed up successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('Invalid username or password');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid username or password');
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.cookie('token', token, { httpOnly: true });
      res.status(200).json({ message: 'Login successful' });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },
  
  logoutUser: async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  }
};

module.exports = userController;
