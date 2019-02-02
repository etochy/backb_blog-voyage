const PORT = process.env.PORT || 5000;
const BDD = process.env.MONGODB_URI || "mongodb://192.168.99.100:27017/";
const SECRET = process.env.SECRET_JWT || "secret";

const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());
const mongoose = require("mongoose");
const Utilisateur = require('./models/utilisateur');
const Article = require('./models/article');
const Message = require('./models/message');
const Blog = require('./models/blog');
const Ressource = require('./models/ressource');
const Commentaire = require('./models/commentaire');
const bodyParser = require('body-parser');


mongoose.Promise = global.Promise;
mongoose.connect(BDD, function (err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + BDD + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + BDD);
    }
});

app.use(bodyParser.urlencoded({limit: '5mb', extended: true }));
app.use(bodyParser.json({limit: '5mb'}));

app.set('jwtTokenSecret', SECRET);

var routes = require('./controllers/controllerUtil'); //importing route
routes(app);

app.listen(PORT, function () {
    console.log("App now running on port");
})

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

module.exports.app = app;