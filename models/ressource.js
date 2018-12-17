var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Ressource = new Schema({
  akRessource: { type: String, required: true, index: { unique: true } },
  ressource: String
});

module.exports = mongoose.model('Ressource', Ressource);