#!/usr/bin/env node

var repl = require('repl');
var flight = require('./flight');

var prompt = repl.start({prompt: 'flights> '});
prompt.context.flight = flight;