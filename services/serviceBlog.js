var mongoose = require('mongoose'),
    Blog = mongoose.model('Blog');

/**
 * Fonction qui permet de recuperer les Ressources
 * 
 * @param {*} req 
 * @param {*} res 
 */
function get_all_blogs(req, res) {
    Blog.find({}).sort({ date: 'desc' }).exec(function (err, blog) {
        if (err)
            res.send(err);
        res.json(blog);
    });
}

function create_article_bog(req, res) {
    var new_blog = new Blog(req.body);
    new_blog.save(function (err, blog) {
        if (err)
            res.send(err);
        else
            res.json(blog);
    });
}

function get_a_blog(req, res) {
    var x = { akBlog: req.params.idArticle };
    Blog.findOne({ x }, function (err, blog) {
        if (err)
            res.send(err);
        else
            res.json(blog);
    });
}

module.exports.get_all_blogs = get_all_blogs;
module.exports.create_article_bog = create_article_bog;
module.exports.get_a_blog = get_a_blog;