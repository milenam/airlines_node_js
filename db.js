var mongoose = require('mongoose');
mongoose.connect('mongodb://Meli:123fourfive@ds037824.mongolab.com:37824/flights');
module.exports = mongoose.connection;