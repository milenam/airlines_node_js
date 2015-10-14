var mongoose = require('mongoose');
mongoose.connect('mongodb://@ds037824.mongolab.com:37824/flights');
module.exports = mongoose.connection;