var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Commentaire = new Schema({
  akArticle: { type: String, required: true},
  comment: String,
  date: Date,
  name: String,
});

module.exports = mongoose.model('Commentaire', Commentaire);