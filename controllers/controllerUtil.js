const {
  all_utils,
  create_util,
  get_a_util,
  update_a_util,
  delete_a_util } = require('../services/serviceUtil');

module.exports = function (app) {
  // Routes
  app.route('/utilisateurs')
    .get(function (req, res) {
      all_utils(req, res);
    })
    .post(function (req, res) {
      create_util(req, res);
    });

  app.route('/utilisateurs/:idUtil')
    .get(function (req, res) {
      get_a_util(req, res);
    })
    .put(function (req, res) {
      update_a_util(req, res);
    })
    .delete(function (req, res) {
      delete_a_util(req, res);
    });
}
