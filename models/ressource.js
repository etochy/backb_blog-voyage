var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Ressource = new Schema({
  akRessource: { type: String, required: true, index: { unique: true } },
  ressource: String,
  ressource_eng: String,
  image64: String
});

module.exports = mongoose.model('Ressource', Ressource);