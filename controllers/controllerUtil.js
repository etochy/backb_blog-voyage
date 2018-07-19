import * as serviceUtil from '../services/serviceUtil';

export default function (app) {
  // Routes
  app.route('/utilisateurs')
    .get(function (req, res) {
      serviceUtil.all_utils();
    })
    .post(function (req, res) { serviceUtil.create_util() });

  app.route('/utilisateurs/:idUtil')
    .get(function (req, res) { serviceUtil.get_a_util() })
    .put(function (req, res) { serviceUtil.update_a_util() })
    .delete(function (req, res) { serviceUtil.delete_a_util() });
}
