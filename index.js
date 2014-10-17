var api = require('./api');

function Bus (key) {
  this.key = 'api_key='+key;
  this.url = function(type) {
    return 'http://api.wmata.com' + type + this.key;
  }

  this.getBusRoutes          = api.getBusRoutes;
  this.getBusStops           = api.getBusStops;
  this.getBusScheduleByRoute = api.getBusScheduleByRoute;
  this.getBusRouteDetails    = api.getBusRouteDetails;
  this.getBusPositions       = api.getBusPositions;
  this.getBusScheduleByStop  = api.getBusScheduleByStop;
  this.getBusPrediction      = api.getBusPrediction;
  this.getClosestPrediction  = api.getClosestPrediction;
  this.getPredictionSeries   = api.getPredictionSeries;
}

module.exports = Bus;