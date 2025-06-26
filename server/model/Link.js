const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  slug: { type: String, unique: true },
  originalUrl: String,
  clickCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
