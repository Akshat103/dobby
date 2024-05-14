const mongoose = require('mongoose');
const Image = require('../models/ImageModel');

const imageController = {
  uploadImage: async (req, res) => {
    try {
      const { name, folderId } = req.body;
      const imageUrl = req.file.path;
      const image = await Image.create({ name, folderId, userId: req.userId, imageUrl });
      res.status(201).json({ message: 'Image uploaded successfully', image });
    } catch (err) {
      console.log(err)
      res.status(400).json({ error: err.message });
    }
  },

  getAllImagesByFolderId: async (req, res) => {
    try {
      const { folderId } = req.query;

      const images = await Image.find({
        folderId: folderId, 
        userId: req.userId
      });

      res.status(200).json({ images });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = imageController;
