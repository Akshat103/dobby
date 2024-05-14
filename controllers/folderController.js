const Folder = require('../models/FolderModel');

const folderController = {
  createFolder: async (req, res) => {
    try {
      const { name } = req.body;
      const folder = await Folder.create({ name, userId: req.userId });
      res.status(201).json({ message: 'Folder created successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getAllFolders: async (req, res) => {
    try {
      const folders = await Folder.find({ userId: req.userId }, 'name');
      res.status(200).json({ folders });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = folderController;
