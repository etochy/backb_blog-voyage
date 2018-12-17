var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Message = new Schema({
  akMessage: { type: String, required: true, index: { unique: true } },
  message: String,
  date: Date,
  email: String,
  telephone: String,
  vu: Boolean
});

module.exports = mongoose.model('Message', Message);