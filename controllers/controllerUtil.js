const serviceUtil = require('../services/serviceUtil');
const serviceAuth = require('../services/serviceAuth');
const serviceArti = require('../services/serviceArticles');
const serviceMail = require('../services/serviceMail');
const serviceRessources = require('../services/serviceRessources');
const serviceBlog = require('../services/serviceBlog');

var jwtauth = require('../lib/jwtauth')

module.exports = function (app) {

  /**
 * A simple middleware to restrict access to authenticated users.
 */
  var requireAuth = function (req, res, next) {
    if (!req.user) {
      //console.log(req);
      res.status(401).end('Non autorise');
    } else {
      next()
    }
  }

  // LOGIN
  app.route('/login')
    .post((req, res) => serviceAuth.login(req, res));

  // FIL ACTUALITE
  app.route('/articles')
    .get((req, res) => serviceArti.get_articles(req, res))
    .post(jwtauth, requireAuth, (req, res) => serviceArti.create_article(req, res));

  app.route('/articles/:idArticle')
    .get((req, res) => serviceArti.get_a_article(req, res));

  app.route('/commentaires')
    .get((req, res) => serviceArti.get_comments(req, res))
    .post((req, res) => serviceArti.create_comment(req, res));

  // ARTICLES BLOG
  app.route('/blog')
    .get((req, res) => serviceBlog.get_all_blogs(req, res))
    .post(jwtauth, requireAuth, (req, res) => serviceBlog.create_article_bog(req, res));

  app.route('/blog/:idArticle')
    .get((req, res) => serviceBlog.get_a_blog(req, res));
    
  // CONTACT
  app.route('/contacter')
    .get(jwtauth, requireAuth, (req, res) => serviceMail.get_all_messages(req, res))
    // .post((req, res) => serviceMail.envoi_mail(req, res));
    .post((req, res) => serviceMail.creer_message(req, res));

  app.route('/contacter/:idMessage')
    .put(jwtauth, requireAuth, (req, res) => serviceMail.update_a_message(req, res));

  app.route('/messages')
    .get(jwtauth, requireAuth, (req, res) => serviceMail.get_all_messages(req, res));

  // RESSOURCES
  app.route('/ressources')
    .get((req, res) => serviceRessources.get_ressources(req, res))
    .post(jwtauth, requireAuth, (req, res) => serviceRessources.create_a_ressource(req, res));

  app.route('/ressources/:idRessource')
    .put(jwtauth, requireAuth, (req, res) => serviceRessources.update_a_ressource(req, res));

  // zone protegée
  // UTILISATEURS
  app.route('/utilisateurs')
    .get(jwtauth, requireAuth, (req, res) => serviceUtil.all_utils(req, res))
    .post(jwtauth, requireAuth, (req, res) => serviceUtil.create_util(req, res));
    // .post((req, res) => serviceUtil.create_util(req, res));
  //.post( bodyParser(), jwtauth, requireAuth,  (req, res) => service.create_util(req, res));

  app.route('/utilisateurs/:idUtil')
    .get((req, res) => serviceUtil.get_a_util(req, res))
    .put(jwtauth, requireAuth, (req, res) => serviceUtil.update_a_util(req, res))
    .delete(jwtauth, requireAuth, (req, res) => serviceUtil.delete_a_util(req, res));

  app.route('/utilisateurs/update-position/:idUtil')
    .put(jwtauth, requireAuth, (req, res) => serviceUtil.update_a_util_pos(req, res));

}