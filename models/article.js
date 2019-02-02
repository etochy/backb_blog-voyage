var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Article = new Schema({
  utilisateur: String,
  akArticle: { type: String, required: true, index: { unique: true } },
  title: String,
  title_eng: String,
  date: Date,
  localisation: String,
  description: String,
  description_eng: String,
  image: String,
  image64: String
});

module.exports = mongoose.model('Article', Article);