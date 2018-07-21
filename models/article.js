var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Article = new Schema({
  utilisateur: String,
  akArticle: { type: String, required: true, index: { unique: true } },
  nom: String,
  date: Date,
  localisation: String,
  description: String
});

module.exports = mongoose.model('Article', Article);