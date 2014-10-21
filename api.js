var request = require('request');
var async = require('async');

// Private functions

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
      var returnString = body.replace(/<..>/, '').replace(/<...>/,'');
      return done(new Error(returnString));
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


// Base functions


/**
 * Get all bus routes
 * @param  {Function} done - callback(err, response)
 * @return {Array}        - returns list of bus routes
 */
exports.getBusRoutes = function getBusRoutes(done) {
  var route = '/Bus.svc/json/jRoutes?'
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data.Routes);
  });
}

/**
 * Get all bus stops
 * @param  {Object}   loc    - coordinates in object format loc.lat, loc.lon
 * @param  {number}   radius - the radius in meters
 * @param  {Function} done   - callback(err, response)
 * @return {Array}           - returns list of bus stops
 */
exports.getBusStops = function getBusStops(loc, radius, done) {
  var route = '/Bus.svc/json/jStops?lat='+loc.lat+'&lon='+loc.lon+'&radius='+radius+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data.Stops);
  });
}

/**
 * Get bus schedules by route
 * @param  {String}   id        - Bust Route ID
 * @param  {String}   date      - date in year-month-day format
 * @param  {String}   variation - variation true or false, in string format
 * @param  {Function} done      - callback(err, response)
 * @return {Array}              - returns list schedule by routes
 */
exports.getBusScheduleByRoute = function getBusScheduleByRoute(id, date, variation, done){
  var route = '/Bus.svc/json/jRouteSchedule?routeId='+ id +'&date='+date+'&includingVariations='+variation +'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  })
}

/**
 * Get bus route details
 * @param  {String}   id   - bus route ID
 * @param  {String}   date - date in year-month-day format
 * @param  {Function} done - callback(err, response)
 * @return {Array}        - returns list of bus route details
 */
exports.getBusRouteDetails = function getBusRouteDetails(id, date, done){
  var route = '/Bus.svc/json/jRouteDetails?routeId='+id+'&date='+date+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
}

/**
 * [getBusPositions description]
 * @param  {String}   id        - Route ID
 * @param  {String}   variation - bool in string format
 * @param  {Object}   loc       - coordinates in object format loc.lat, loc.lon
 * @param  {Number}   radius    - radius in meters of bus positions
 * @param  {Function} done      - callback(err, response)
 * @return {Array}              - returns list of bus positions
 */
exports.getBusPositions = function getBusPositions(id, variation, loc, radius, done) {
  var route = '/Bus.svc/json/jBusPositions?routeId='+id+'&includingVariations='+variation+'&lat='+loc.lat+'&lon='+loc.lon+'&radius='+radius+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data.BusPositions);
  });
}

/**
 * Get bus schedules by stops
 * @param  {String}   id   - bus stopID
 * @param  {String}   date - data in year-month-day format
 * @param  {Function} done - callback(err, response)
 * @return {Array}        - returns list of schedules by stop
 */
exports.getBusScheduleByStop = function getBusScheduleByStop(id, date, done) {
  var route = '/Bus.svc/json/jStopSchedule?stopId='+id+'&date='+date+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
}

/**
 * Get bus predictions
 * @param  {String}   id   - bus stopID
 * @param  {Function} done - callback(err, response)
 * @return {Array}         - returns list of predictions
 */
exports.getBusPrediction = function getBusPrediction(id, done) {
  var route = '/NextBusService.svc/json/jPredictions?StopID='+id+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data.Predictions);
  });
}





// Extended functions

/**
 * Get station predictions based on the closest stations given a location. Great for getting predictions, without nowing the stations within a location. 
 * @param  {Object}   loc    - coordinates in object format loc.lat, loc.lon
 * @param  {Number}   radius - radius in meters
 * @param  {Number}   limit  - max amount of stations to include
 * @param  {Function} done   - callback(err, response)
 * @return {Array}           - returns list of bus station predictions, sorted by closest to location provided
 */
exports.getClosestStationsPrediction = function getClosestStationsPrediction(loc, radius, limit, done) {
  var route = '/Bus.svc/json/jStops?lat='+loc.lat+'&lon='+loc.lon+'&radius='+radius+'&';
  var self = this;

  get(self.url(route), function(err, data) {
    if (err) {
      return done(err);
    }
    else {
      var listOfStations = data.Stops.slice(0, limit);
      async.map(listOfStations, function(station, cb) {
        setTimeout(function() {
          var route = '/NextBusService.svc/json/jPredictions?StopID='+station.StopID+'&';
          get(self.url(route), function(err, res) {
            if (err) {
              return cb(err);
            }
            else {
              return cb(null, {name: res.StopName, data: res.Predictions});
            }
          });
        }, 250);
      }, function(err, mappedData) {
        if (err) {
          return done(err);
        }
        else {
          return done(null, mappedData);
        }
      });
    }
  });
}


/**
 * Get bus predictions, in a series. Great if you have a list of stations, and need to get predictions for all of them.
 * @param  {Array}   arr    - list of station ids
 * @param  {Function} done  - callback(err, response)
 * @return {Array}          - returns list of corresponding predictions
 */
exports.getBusPredictionSeries = function getBusPredictionSeries(arr, done) {
  var self = this;
  async.mapSeries(arr, function(item, cb) {
    setTimeout(function() {
      self.getBusPrediction(item, function(err, res) {
        if (err) {
          return cb(err);
        }
        else {
          return cb(null, {name: item, data: res})
        }
      })
    }, 250);
  }, function(err, mappedData) {
    if (err) {
      return done(err);
    }
    else {
      return done(null, mappedData);
    }
  });
}