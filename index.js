var api = require('./api');

function Bus (key) {
  if (!key) {
    throw new Error('must provide a key');
  }

  this.key = 'api_key='+key;
  this.url = function(type) {
    return 'http://api.wmata.com' + type + this.key;
  }

  this.getBusRoutes                 = api.getBusRoutes;
  this.getBusStops                  = api.getBusStops;
  this.getBusScheduleByRoute        = api.getBusScheduleByRoute;
  this.getBusRouteDetails           = api.getBusRouteDetails;
  this.getBusPositions              = api.getBusPositions;
  this.getBusScheduleByStop         = api.getBusScheduleByStop;
  this.getBusPrediction             = api.getBusPrediction;
  this.getClosestStationsPrediction = api.getClosestStationsPrediction;
  this.getPredictionSeries          = api.getPredictionSeries;
}

module.exports = Bus;