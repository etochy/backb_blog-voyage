const appli = require('../index');
var mongoose = require('mongoose'),
    Utilisateur = mongoose.model('Utilisateur');
var moment = require('moment');
var jwt = require('jwt-simple');

function login(req, res) {

    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {

        console.log('dedans : ' + username + password);

        // Fetch the appropriate user, if they exist
        Utilisateur.findOne({ username }, function (err, user) {

            if (err) {
                // user cannot be found; may wish to log that fact here. For simplicity, just return a 401
                res.send('Authentication error', 401)
            }

            user.comparePassword(password, function (err, isMatch) {
                if (err) {
                    // an error has occured checking the password. For simplicity, just return a 401
                    res.send('Authentication error', 401)
                }
                if (isMatch) {

                    // Great, user has successfully authenticated, so we can generate and send them a token.	
                    var expires = moment().add(7, 'days').valueOf()
                    
                    var token = jwt.encode(
                        {
                            iss: user.id,
                            exp: expires
                        },
                        appli.app.get('jwtTokenSecret')
                    );

                    const userResp = new Utilisateur();
                    userResp.nom = user.nom;
                    userResp.prenom = user.prenom;
                    userResp.email = user.email;
                    userResp.username = user.username;

                    res.json({
                        token: token,
                        expires: expires,
                        user: userResp.toJSON()
                    });
                } else {
                    // The password is wrong...
                    res.send('Authentication error', 401)
                }
            });

        });
    } else {
        // No username provided, or invalid POST request. For simplicity, just return a 401
        res.send('Authentication error', 401)
    }
};

module.exports.login = login;