'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Utilisateur = new Schema({
    nom: {
        type: String
    },
    prenom: {
        type: String
    },
    age: {
        type: Number, min: 0
    }
});

module.exports = mongoose.model('Utilisateur', Utilisateur);