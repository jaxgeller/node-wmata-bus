var request = require('request');



function get(url, done) {
  request(url, function(err, res, body) {
    if (err) return done(err);
    if (res.statusCode !== 200) return done(new Error('Returned ' + res.statusCode));
    try {
      return done(null, JSON.parse(body));
    } catch(e) {
      return done(e);
    }
  });
}



exports.getBusRoutes = function(done) {
  var route = '/Bus.svc/json/jRoutes?'
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data.Routes);
  });
}


exports.getBusStops = function(loc, radius, done) {
  var route = '/Bus.svc/json/jStops?lat='+loc.lat+'&lon='+loc.lon+'&radius='+radius+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data.Stops);
  });
}


exports.getBusScheduleByRoute = function(id, date, variation, done){
  var route = '/Bus.svc/json/jRouteSchedule?routeId='+ id +'&date='+date+'&includingVariations='+variation +'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  })
}


exports.getBusRouteDetails = function(id, date, done){
  var route = '/Bus.svc/json/jRouteDetails?routeId='+id+'&date='+date+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
}


exports.getBusPositions = function(id, variation, loc, radius, done) {
  var route = '/Bus.svc/json/jBusPositions?routeId='+id+'&includingVariations='+variation+'&lat='+loc.lat+'&lon='+loc.lon+'&radius='+radius+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data.BusPositions);
  });
}


exports.getBusScheduleByStop = function(id, date, done) {
  var route = '/Bus.svc/json/jStopSchedule?stopId='+id+'&date='+date+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
}


exports.getBusPrediction = function(id, done) {
  var route = '/NextBusService.svc/json/jPredictions?StopID='+id+'&';
  console.log(this.url(route));
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data.Predictions);
  });
}