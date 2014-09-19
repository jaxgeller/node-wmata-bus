var should = require('chai').should();
var Bus = require('../');
var client = new Bus(process.env.PASSWORD);

var location = {
  lat: 38.9059581,
  lon: -77.0416805  
}

describe('Bus API', function() {


  it('.getBusRoutes', function(done) {
    client.getBusRoutes(function(err, data) {
      if (err) return done(err);
      data.should.be.json;
      data.length.should.be.above(2);
      data[0].should.have.keys('Name', 'RouteID');
      return done();
    });
  });

  it('.getBusStops', function(done) {
    client.getBusStops(location, '500', function(err, data) {
      if (err) return done(err);
      data.should.be.json;
      data.length.should.be.above(2);
      data[0].should.have.keys('Lat', 'Lon', 'Name', 'Routes', 'StopID');
      return done()
    });
  });

  it('.getBusScheduleByRoute', function(done) {
    client.getBusScheduleByRoute('16L', '2014-09-19', 'false', function(err, data) {
      if (err) return done(err);
      data.should.be.json;
      data.Direction0.should.be.an.array;
      data.Direction1.should.be.an.array;
      data.Direction0[0].should.have.keys('DirectionNum', 'EndTime', 'RouteID', 'StartTime', 'StopTimes', 'TripDirectionText', 'TripHeadsign', 'TripID');
      return done();
    });
  });

  it('.getBusRouteDetails', function(done) {
    client.getBusRouteDetails('16L', '2014-09-19', function(err, data) {
      if (err) return done(err);
      data.should.be.json;
      data.RouteID.should.eql('16L');
      data.should.have.property('Direction0');
      data.should.have.property('Direction1');
      return done();
    });
  });

  it('.getBusPositions', function(done) {
    client.getBusPositions('10A', 'true', location, 500, function(err, data) {
      if (err) return done(err);
      data.should.be.json;
      data.should.be.an.array;
      return done();
    });
  });

  it('.getBusScheduleByStop', function(done) {
    client.getBusScheduleByStop('2000019', '2014-09-19', function(err, data) {
      if (err) return done(err);
      data.should.be.json;
      data.should.have.property('ScheduleArrivals');
      data.should.have.property('Stop');
      data.ScheduleArrivals[0].should.have.keys('DirectionNum', 'EndTime', 'RouteID', 'ScheduleTime', 'StartTime', 'TripDirectionText', 'TripHeadsign', 'TripID');
      return done();
    });
  });

  it('.getBusPrediction', function(done) {
    client.getBusPrediction('1001343', function(err, data) {
      if (err) return done(err);
      data.should.be.json;
      data[0].should.have.keys('DirectionNum', 'DirectionText', 'Minutes', 'RouteID', 'TripID', 'VehicleID');
      return done();
    });
  });

});