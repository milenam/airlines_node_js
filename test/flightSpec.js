var app = require('./helpers/app');

var should = require('should'),
    supertest = require('supertest');

describe('flights', function() {
	it('should return valid data for flight 18', function(done) {
		supertest(app)
		.get('/flight/18')
		.expect(200)
		.end(function (err, res) {
            res.status.should.equal(200);
            done();
		});
		// done();
	})

	it("should return an error from invalid flight", function(done) {
		//throw "don't pass";

		supertest(app)
		.get('/flight/9999')
		.expect(404)
		.end(function (err, res) {
            res.status.should.equal(404);
            done();
		});
	});

	it("should mark a flight as arrived", function(done) {
		//throw "don't pass";

		supertest(app)
		.put('/flight/18/arrived')
		.expect(200)
		.end(function (err, res) {
            res.status.should.equal(200);
            res.body.status.should.equal('done');

            supertest(app)
			.get('/flight/18')
			.expect(200)
			.end(function (err, res) {
	            res.status.should.equal(200);
	            res.body.actualArrive.should.not.equal(undefined);

	            done();
	        });
		});
	})
})