var should = require('chai').should();
var Bus = require('../');

var client = new Bus(process.env.KEY);

var coordinates = {
  lat: 0,
  lon: 0  
}
var radius = 0;
var timeBetween = 1000;
var listOfStations = ['1001343','1001334','1001352', '6000712', '6000818'];


describe('Base Bus API', function() {
  
  beforeEach(function(done) {
    this.timeout(4000);
    setTimeout(function() {
      return done();
    }, 1000);
  });

  it('#getBusroutes', function(done) {
    client.getBusRoutes(function(err, res) {
      if (err) return done(err);
      res.should.be.an.array;
      res.length.should.be.above(50);
      return done()
    });
  });

  it('#getBusStops', function(done) {
    this.timeout(8000);
    client.getBusStops(coordinates, radius, function(err, res) {
      if (err) return done(err);
      res.should.be.an.array;
      res[0].StopID.should.eql('4000472');
      res[1].StopID.should.eql('1003031');
      res[2].StopID.should.eql('6000459');
      res[3].StopID.should.eql('6000488');
      res[4].StopID.should.eql('6000490');
      return done();
    });
  });

  it('#getBusScheduleByRoute', function(done) {
    client.getBusScheduleByRoute('16L', '2014-09-19', 'false', function(err, res) {
      if (err) return done(err);
      res.Direction0[0].RouteID.should.eql('16L');
      res.Direction1[0].RouteID.should.eql('16L');
      res.Name.should.eql('16L - 16L ANN-SKY CITY-PENT (521)')
      return done();
    });
  });

  it('#getBusRouteDetails', function(done) {
    client.getBusRouteDetails('16L', '2014-09-19', function(err, res) {
      if (err) return done(err);
      res.RouteID.should.eql('16L');
      res.Name.should.eql('16L - 16L ANN-SKY CITY-PENT (521)');
      res.Direction0.Shape[0].Lat.should.eql(38.869001795);
      res.Direction0.Shape[0].Lon.should.eql(-77.05376549);
      return done();
    });
  });

  it('#getBusPositions', function(done) {
    this.timeout(8000);
    client.getBusPositions('10A', 'true', coordinates, radius, function(err, res) {
      if (err) return done(err);
      res.should.be.an.array;
      res[0].should.have.keys('DateTime', 'Deviation', 'DirectionNum', 'DirectionText', 'Lat', 'Lon', 'RouteID', 'TripEndTime', 'TripHeadsign', 'TripID', 'TripStartTime', 'VehicleID');
      return done();
    });
  });

  it('#getBusScheduleByStop', function(done) {
    client.getBusScheduleByStop('2000019', '2014-10-17', function(err, res) {
      if (err) return done(err);
      res.ScheduleArrivals[0].TripID.should.eql('6782663');
      res.ScheduleArrivals[1].TripID.should.eql('6782670');
      res.ScheduleArrivals[2].TripID.should.eql('6782664');
      res.ScheduleArrivals[3].TripID.should.eql('6782665');
      res.ScheduleArrivals[4].TripID.should.eql('6782666');
      return done();  
    });
  });

  it('#getBusPrediction', function(done) {
    client.getBusPrediction('1001343', function(err, res) {
      if (err) return done(err);
      res.should.be.an.array;
      res[0].should.have.keys('DirectionNum', 'DirectionText', 'Minutes', 'RouteID', 'TripID', 'VehicleID');
      return done()
    });
  });
});




describe('Extended bus api', function() {

  beforeEach(function(done) {
    this.timeout(4000);
    setTimeout(function() {
      return done();
    }, 1000);
  });

  it('#getClosestStationsPrediction', function(done) {
    this.timeout(8000);
    client.getClosestStationsPrediction(coordinates, radius, 5, function(err, res) {
      if (err) return done(err);
      res[0].name.should.be.eql('#1801 Beauregard St');
      res[1].name.should.be.eql('#4805 Texas Ave Se');
      res[2].name.should.be.eql('10th Rd + Livingston St');
      res[3].name.should.be.eql('10th Rd + Madison St');
      res[4].name.should.be.eql('10th Rd + Madison St');
      return done();
    });
  });

  it('#getBusPredictionSeries', function(done) {
    this.timeout(8000);
    client.getBusPredictionSeries(listOfStations, function(err, res) {
      if (err) return done(err);
      res[0].name.should.be.eql('1001343');
      res[1].name.should.be.eql('1001334');
      res[2].name.should.be.eql('1001352');
      res[3].name.should.be.eql('6000712');
      res[4].name.should.be.eql('6000818');

      res[0].data[0].should.have.keys('DirectionNum', 'DirectionText', 'Minutes', 'RouteID', 'TripID', 'VehicleID')
      return done();
    });
  });




});