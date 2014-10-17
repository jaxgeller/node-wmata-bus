var request = require('request');
var async = require('async');

function get(url, done) {
  var opts = {
    url: url,
    timeout: 5000,
    pool: {maxSockets: Infinity}
  }
  
  request(opts, function(err, res, body) {
    if (err) {
      return done(err);
    }
    
    else if (res.statusCode === 504 || res.statusCode === 408) {
      return (setTimeout(function() {
        get(url, done);
      }, 2500));
    }
    
    else if (res.statusCode !== 200) {
      return done(new Error('returned: '+res.statusCode));
    }

    else if (res.statusCode === 200 && body) {
      try {
        return done(null, JSON.parse(body));
      } catch(e) {
        return done(e);
      }
    }

    else {
      return done(new Error('no response'));
    }

  });
}




exports.getBusRoutes = function getBusRoutes(done) {
  var route = '/Bus.svc/json/jRoutes?'
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data.Routes);
  });
}


exports.getBusStops = function getBusStops(loc, radius, done) {
  var route = '/Bus.svc/json/jStops?lat='+loc.lat+'&lon='+loc.lon+'&radius='+radius+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data.Stops);
  });
}


exports.getBusScheduleByRoute = function getBusScheduleByRoute(id, date, variation, done){
  var route = '/Bus.svc/json/jRouteSchedule?routeId='+ id +'&date='+date+'&includingVariations='+variation +'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  })
}


exports.getBusRouteDetails = function getBusRouteDetails(id, date, done){
  var route = '/Bus.svc/json/jRouteDetails?routeId='+id+'&date='+date+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
}


exports.getBusPositions = function getBusPositions(id, variation, loc, radius, done) {
  var route = '/Bus.svc/json/jBusPositions?routeId='+id+'&includingVariations='+variation+'&lat='+loc.lat+'&lon='+loc.lon+'&radius='+radius+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data.BusPositions);
  });
}


exports.getBusScheduleByStop = function getBusScheduleByStop(id, date, done) {
  var route = '/Bus.svc/json/jStopSchedule?stopId='+id+'&date='+date+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
}


exports.getBusPrediction = function getBusPrediction(id, done) {
  var route = '/NextBusService.svc/json/jPredictions?StopID='+id+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data.Predictions);
  });
}

exports.getClosestPrediction = function getClosestPrediction(loc, radius, limit, done) {
  var route = '/Bus.svc/json/jStops?lat='+loc.lat+'&lon='+loc.lon+'&radius='+radius+'&';
  var self = this;
  get(self.url(route), function(err, data) {
    if (err) return done(err);
    else {
      async.map(data.Stops.slice(0, limit), function(stops, cb){
        console.log(stops)
        setTimeout(function() {
          var route = '/NextBusService.svc/json/jPredictions?StopID='+stops.StopID+'&';
          get(self.url(route), function(err, res) {
            if (err) return cb(err);
            else return cb(null, {name: stops.Name, data: res.Predictions});
          });
        }, 250);
        
      }, function(e, r) {
        if (e) return done(e);
        else return done(null, r);
      });
    }
  });
}


// exports.getPredictionSeries = function(arr, done) {
//   var self = this;
//   async.mapSeries(arr, function(item, callback){
//     setTimeout(function() {
//       self.getBusPrediction(item, function(err, data) {
//         if (err) return callback(err);
//         if (data) {
//           return callback(null, {name: itemstation: item, data: data.slice(0,3)});
//         }
//       });
//     }, 250);
//   }, function(err, results){
//     if (err) return done(err);
//     else return done(null, results);
//   });
// }