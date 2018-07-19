'use strict';
const mongodb = require("mongodb");
var Schema = mongodb.Schema;


var Utilisateur = new Schema({
  firstname: {
    type: String,
    required: 'Kindly enter the firstname of the user'
  },
  lastname: {
    type: String,
    required: 'Kindly enter the lastname of the user'
  }
});

module.exports = mongodb.model('Utilisateurs', Utilisateur);