var FlightSchema = require('../schemas/flight');

var flight = require('../flight');
var flights = require('../data');
var express = require('express');
var router = express.Router();

// flight objects

for (var number in flights) {
	flights[number] = flight(flights[number]);
}

// var flight1 = flight({
// 	number: 1,
// 	origin: 'LAX',
// 	destination: 'DCA',
// 	departs: '9AM',
// 	arrives: '4PM'
// });

// var flight2 = flight({
// 	number: 2,
// 	origin: 'LAX',
// 	destination: 'PDX',
// 	departs: '10AM',
// 	arrives: '12PM'
// });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/flight/:number', function (req, res) {
	var number = req.param('number');
	if (typeof flights[number] === 'undefined') {
		res.status(404).json({status: 'error'});
	} else {
        res.json(flights[number].getInformation());
	}
});

router.get('/list/json', function (req, res) {
	var flightList = [];

	for(var number in flights) {
		flightList.push(flights[number].getInformation());
	}
    res.json(flightList);

});

router.put('/flight/:number/arrived', function (req, res) {
	var number = req.param('number');
	if (typeof flights[number] === 'undefined') {
		res.status(404).json({status: 'error'});
	} else {
		flights[number].triggerArrive();

		var record = new FlightSchema(flights[number].getInformation());

        record.save(function(err) {
            if(err) {
            	console.log(err);
            	res.status(500).json({status: 'failure'})
            } else {
            	res.json({status: 'success'});
            }
        });

        //res.json({status: 'done'});
	}

});

router.get('/list', function (req, res) {
	res.render('list', {title: 'All flights',
                        flights: flights
    })
});

// router.get('/flight1', function (req, res) {
//   res.json(flight1.getInformation());
// });

// router.get('/flight2',  function (req, res) {
//   res.json(flight2.getInformation());
// });

module.exports = router;

// exports.flight1 = function (req, res) {
//   res.json(flight1.getInformation());
// }

// exports.flight2 = function (req, res) {
//   res.json(flight2.getInformation());
// }

