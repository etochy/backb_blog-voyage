const serviceUtil = require('../services/serviceUtil');
const serviceAuth = require('../services/serviceAuth');
const serviceArti = require('../services/serviceArticles');

const bodyParser = require('body-parser');
var jwtauth = require('../lib/jwtauth')

module.exports = function (app) {

  /**
 * A simple middleware to restrict access to authenticated users.
 */
  var requireAuth = function (req, res, next) {
    if (!req.user) {
      console.log('auth');
      res.status(401).end('Non autorise');
    } else {
      next()
    }
  }

  app.route('/login')
    .post((req, res) => serviceAuth.login(req, res));

  app.route('/articles')
    .get((req, res) => serviceArti.get_articles(req, res))
    .post(jwtauth, requireAuth, (req, res) => serviceArti.create_article(req, res));

  app.route('/articles/:idArticle')
    .get((req, res) => serviceArti.get_a_article(req, res))


  // zone protegée
  app.route('/utilisateurs')
    .get(jwtauth, requireAuth, (req, res) => serviceUtil.all_utils(req, res))
    .post(jwtauth, requireAuth, (req, res) => serviceUtil.create_util(req, res));
  //.post( bodyParser(), jwtauth, requireAuth,  (req, res) => service.create_util(req, res));

  app.route('/utilisateurs/:idUtil')
    .get(jwtauth, requireAuth, (req, res) => serviceUtil.get_a_util(req, res))
    .put(jwtauth, requireAuth, (req, res) => serviceUtil.update_a_util(req, res))
    .delete(jwtauth, requireAuth, (req, res) => serviceUtil.delete_a_util(req, res));


}


/*

app.get('/secret', express.bodyParser(), jwtauth, requireAuth, function(req, res){	
	res.send('Hello ' + req.user.username)
})


*/