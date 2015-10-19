var app = require('./app')(flights, db);
var flights = require('./data');
var db = require('./db');
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});