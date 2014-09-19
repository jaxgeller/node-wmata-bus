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



// /Bus.svc/json/jRoutes?api_key=n7ch87y8fapve2g8dukccnbv
exports.getBusRoutes = function(done) {
  var route = '/Bus.svc/json/jRoutes?'
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data.Routes);
  });
}


// /Bus.svc/json/jStops?lat=38.878586&lon=-76.989626&radius=500&api_key=n7ch87y8fapve2g8dukccnbv
exports.getBusStops = function(loc, radius, done) {
  var route = '/Bus.svc/json/jStops?lat='+loc.lat+'&lon='+loc.lon+'&radius='+radius+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data.Stops);
  });
}


// /Bus.svc/json/jRouteSchedule?routeId=16L&date=2014-09-19&includingVariations=false&api_key=n7ch87y8fapve2g8dukccnbv
exports.getBusScheduleByRoute = function(id, date, variation, done){
  var route = '/Bus.svc/json/jRouteSchedule?routeId='+ id +'&date='+date+'&includingVariations='+variation +'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  })
}


// /Bus.svc/json/jRouteDetails?routeId=16L&date=2014-09-19&api_key=n7ch87y8fapve2g8dukccnbv
exports.getBusRouteDetails = function(id, date, done){
  var route = '/Bus.svc/json/jRouteDetails?routeId='+id+'&date='+date+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
}


// /Bus.svc/json/jBusPositions?routeId=10A&includingVariations=true&lat=0&lon=0&radius=0&api_key=n7ch87y8fapve2g8dukccnbv
exports.getBusPositions = function(id, variation, loc, radius, done) {
  var route = '/Bus.svc/json/jBusPositions?routeId='+id+'&includingVariations='+variation+'&lat='+loc.lat+'&lon='+loc.lon+'&radius='+radius+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data.BusPositions);
  });
}


// /Bus.svc/json/jStopSchedule?stopId=2000019&date=2014-09-19&api_key=n7ch87y8fapve2g8dukccnbv
exports.getBusScheduleByStop = function(id, date, done) {
  var route = '/Bus.svc/json/jStopSchedule?stopId='+id+'&date='+date+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
}


// /NextBusService.svc/json/jPredictions?StopID=1001888&api_key=n7ch87y8fapve2g8dukccnbv
exports.getBusPrediction = function(id, done) {
  var route = '/NextBusService.svc/json/jPredictions?StopID='+id+'&';
  console.log(this.url(route));
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data.Predictions);
  });
}