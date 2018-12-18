var mongoose = require('mongoose'),
    Ressource = mongoose.model('Ressource');

/**
 * Fonction qui permet de recuperer les Ressources
 * 
 * @param {*} req 
 * @param {*} res 
 */
function get_ressources(req, res) {
    Ressource.find({}).exec(function (err, util) {
        if (err)
            res.send(err);
        res.json(util);
    });
   
}
function create_a_ressource(req, res) {
    var new_ressource = new Ressource(req.body);
    new_ressource.save(function (err, ressource) {
        if (err)
            res.send(err);
        else
            res.json(ressource);
    });
}

function update_a_ressource(req, res) {
    var _res = new Ressource(req.body);
    Ressource.findOne({ akRessource: req.params.idRessource }, function (err, ress) {
        if (err)
            res.send(err);
        else {
            ress.ressource = _res.ressource;
            ress.ressource_eng = _res.ressource_eng;
            ress.save(function (err, ress) {
                if (err)
                    res.send(err);
                res.json(ress);
            });
        }
    });
}

module.exports.get_ressources = get_ressources;
module.exports.create_a_ressource = create_a_ressource;
module.exports.update_a_ressource = update_a_ressource;