const mongoose = require('mongoose');
const { MongooseFindByReference } = require('mongoose-find-by-reference');

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true },
  imageUrl: { type: String, required: true },
});

imageSchema.plugin(MongooseFindByReference);

module.exports = mongoose.model('Image', imageSchema);
