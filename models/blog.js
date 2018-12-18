var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Blog = new Schema({
  utilisateur: String,
  akBlog: { type: String, required: true, index: { unique: true } },
  title: String,
  date: Date,
  image: String,
  contenu: String,
  title_eng: String,
  contenu_eng: String,
});

module.exports = mongoose.model('Blog', Blog);