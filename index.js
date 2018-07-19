'use strict';

const PORT = process.env.PORT || 5000;
const BDD = process.env.MONGODB_URI || "mongodb://192.168.99.100:27017/"
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const Utilisateur = require('./models/utilisateur');
const bodyParser = require('body-parser');

const UTILISATEURS_COLLECTION = "utilisateurs";

mongoose.Promise = global.Promise;
mongoose.connect(BDD, function (err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + BDD + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + BDD);
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./controllers/controllerUtil'); //importing route
routes(app);

app.listen(PORT, function () {
    console.log("App now running on port");
})

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});