var mongoose = require('mongoose'),
    Article = mongoose.model('Article');

/**
 * Fonction qui permet de recuperer les articles
 * 
 * @optionnal limit le nombre d'articles a récuperer
 * @optionnal skip 
 * @param {*} req 
 * @param {*} res 
 */
function get_articles(req, res) {
    var limit = parseInt(req.query.limit) || null;
    var skip = parseInt(req.query.skip) || 0;

    if (req.query.limit !== null) {
        var y = parseInt(req.query.limit);
        Article.find({}).sort({ date: 'desc' }).skip(skip).limit(y).exec(function (err, util) {
            if (err)
                res.send(err);
            res.json(util);
        });
    } else {
        Article.find({}, function (err, util) {
            if (err)
                res.send(err);
            res.json(util);
        });
    }
}
function create_article(req, res) {
    console.log('create utils')
    var new_article = new Article(req.body);
    new_article.save(function (err, article) {
        if (err)
            res.send(err);
        else
            res.json(article);
    });
}
function get_a_article(req, res) {
    console.log('get a utils')
    var x = { akArticle: req.params.article };
    Article.findOne({ x }, function (err, article) {
        if (err)
            res.send(err);
        else
            res.json(article);
    });
}
function update_a_article(req, res) {
    console.log('up utils')
}
function delete_a_util(req, res) {
    console.log('del utils')
}



module.exports.get_articles = get_articles;
module.exports.create_article = create_article;
module.exports.get_a_article = get_a_article;
module.exports.update_a_article = update_a_article;
module.exports.delete_a_util = delete_a_util;