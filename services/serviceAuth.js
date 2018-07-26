const appli = require('../index');
var mongoose = require('mongoose'),
    Utilisateur = mongoose.model('Utilisateur');
var moment = require('moment');
var jwt = require('jwt-simple');

function login(req, res) {

    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {

        // Fetch the appropriate user, if they exist
        Utilisateur.findOne({ username }, function (err, user) {

            if (err || user === null) {
                // user cannot be found; may wish to log that fact here. For simplicity, just return a 401
                console.log('error');
                res.status(401).send('Authentication error');
            }

            else {
                user.comparePassword(password, function (err, isMatch) {
                    if (err) {
                        // an error has occured checking the password. For simplicity, just return a 401

                        res.status(401).send('Authentication error');
                    }
                    if (isMatch) {

                        // Great, user has successfully authenticated, so we can generate and send them a token.	
                        var expires = moment().add(1,'days');

                        var token = jwt.encode(
                            {
                                iss: user.id,
                                exp: expires
                            },
                            appli.app.get('jwtTokenSecret')
                        );

                        user.password = '';

                        res.json({
                            token: token,
                            expires: expires,
                            user: user.toJSON()
                        });
                    } else {
                        // The password is wrong...
                        res.status(401).send('Authentication error');
                    }
                });
            }



        });
    } else {
        // No username provided, or invalid POST request. For simplicity, just return a 401
        res.send('Authentication error', 401)
    }
};

module.exports.login = login;