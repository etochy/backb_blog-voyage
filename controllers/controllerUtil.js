const service = require('../services/serviceUtil');

module.exports = function (app) {
  // Routes
  app.route('/utilisateurs')
    .get((req, res) => service.all_utils(req, res))
    .post((req, res) => service.create_util(req, res));

  app.route('/utilisateurs/:idUtil')
    .get((req, res) => service.get_a_util(req, res))
    .put((req, res) => service.update_a_util(req, res))
    .delete((req, res) => service.delete_a_util(req, res));
}
