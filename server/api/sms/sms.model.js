'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var SmsSchema = new Schema({
  number: String,
  buysell: String,
  quantity: Number,
  fish: String,
  price: Number,
  date: { type: Date, default: Date() }
});

module.exports = mongoose.model('Sms', SmsSchema);
