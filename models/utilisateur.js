
/**
 * Simple User module
 *
 * Contains a Mongoose schema / class definition for a user, a password implementation
 *
 * CREDITS
 * -------
 * Most of this code was taken from the excellent http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt 
 * and https://github.com/lukaswhite/jwt-node-express
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

var Utilisateur = new Schema({
    nom: String,
    prenom: String,
    email: { type: String, required: true },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    position: String, 
    pays: String,
    ville: String,
    bio: String,
    image: String
});

Utilisateur.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

Utilisateur.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Utilisateur', Utilisateur);