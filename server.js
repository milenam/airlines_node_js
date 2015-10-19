#!/usr/bin/env node

var app = require('./app')(flights, db);
var flights = require('./data');
var db = require('./db');
var repl = require('repl');
var flight = require('./flight');
var argv = require('optimist').argv;
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var prompt = repl.start({prompt: 'flights> '});
prompt.context.flight = flight; // creates a new object
// prompt.context.data = flights;

// console.log(argv);
// console.log(process.argv);

if (argv.flight && argv.destination) {
	flights[argv.flight].data.destination = argv.destination;
};