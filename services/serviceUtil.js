var mongoose = require('mongoose'),
    Utilisateur = mongoose.model('Utilisateur');

function all_utils(req, res) {
    Utilisateur.find({}, function (err, util) {
        if (err)
            res.send(err);
        else
            res.json(util);
    });

}
function create_util(req, res) {
    var new_util = new Utilisateur(req.body);
    new_util.save(function (err, util) {
        if (err)
            res.send(err);
        else
            res.json(util);
    });
}
function get_a_util(req, res) {
    console.log('get a utils')
    Utilisateur.findOne({ username: req.params.idUtil }, function (err, util) {
        if (err)
            res.send(err);
        else {
            util.password = '';
            res.json(util);
        }

    });

}

function update_a_util(req, res) {
    var _util = new Utilisateur(req.body);

    Utilisateur.findOne({ username: req.params.idUtil }, function (err, util) {
        if (err)
            res.send(err);
        else {
            util.nom = _util.nom;
            util.prenom = _util.prenom;
            util.email = _util.email;
            util.position = _util.position;
            util.pays = _util.pays;
            util.ville = _util.ville;
            util.bio = _util.bio

            util.save(function (err, util) {
                if (err)
                    res.send(err);
                res.json(util);
            });
        }

    });
}

function delete_a_util(req, res) {
    // not implemented yet
    console.log('del utils')
}



module.exports.all_utils = all_utils;
module.exports.create_util = create_util;
module.exports.get_a_util = get_a_util;
module.exports.update_a_util = update_a_util;
module.exports.delete_a_util = delete_a_util;

