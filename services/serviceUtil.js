const { db } = require('./../index');

function all_utils(req, res) {
    res.end('coucou');
    console.log('all utils')
}
function create_util(req, res) {
    console.log('create utils')
}
function get_a_util(req, res) {
    console.log('get a utils')
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
