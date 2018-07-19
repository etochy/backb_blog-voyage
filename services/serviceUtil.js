const { db } = require('./../index');
var mongoose = require('mongoose'),
    Utilisateur = mongoose.model('Utilisateur');

function all_utils(req, res) {
    console.log('all utils');

    Utilisateur.find({}, function (err, util) {
        if (err)
            res.send(err);
        res.json(util);
    });

}
function create_util(req, res) {
    console.log('create utils')
    var new_util = new Utilisateur(req.body);
    new_util.save(function (err, util) {
        if (err)
            res.send(err);
        res.json(util);
    });
}
function get_a_util(req, res) {
    console.log('get a utils')

    Utilisateur.findById(req.params.idUtil, function(err, util) {
        if (err)
          res.send(err);
        res.json(util);
      });

}
function update_a_util(req, res) {
    console.log('up utils')
}
function delete_a_util(req, res) {
    console.log('del utils')
}

module.exports.all_utils = all_utils;
module.exports.create_util = create_util;
module.exports.get_a_util = get_a_util;
module.exports.update_a_util = update_a_util;
module.exports.delete_a_util = delete_a_util;
