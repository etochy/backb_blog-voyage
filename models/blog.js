var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Blog = new Schema({
  utilisateur: String,
  akBlog: { type: String, required: true, index: { unique: true } },
  nom: String,
  date: Date,
  image: String,
  contenu: String
});

module.exports = mongoose.model('Blog', Blog);