## wmata-bus-js

[![Build Status](https://travis-ci.org/jacksongeller/wmata-bus.js.svg?branch=master)](https://travis-ci.org/jacksongeller/wmata-bus.js)

## Install 
`$ npm install wmata-bus-js --save`


## Use
1. Get API key
2. Init client

```js
var Bus = require('wmata-bus-js');
var client = new Bus('api key here');
```

## API

### getBusRoutes(done) 

Get all bus routes

**Parameters**

**done**: `function`, callback(err, response)

**Returns**: `Array`, - returns list of bus routes


### getBusStops(loc, radius, done) 

Get all bus stops

**Parameters**

**loc**: `Object`, coordinates in object format loc.lat, loc.lon

**radius**: `number`, the radius in meters

**done**: `function`, callback(err, response)

**Returns**: `Array`, - returns list of bus stops


### getBusScheduleByRoute(id, date, variation, done) 

Get bus schedules by route

**Parameters**

**id**: `String`, Bust Route ID

**date**: `String`, date in year-month-day format

**variation**: `String`, variation true or false, in string format

**done**: `function`, callback(err, response)

**Returns**: `Array`, - returns list schedule by routes


### getBusRouteDetails(id, date, done) 

Get bus route details

**Parameters**

**id**: `String`, bus route ID

**date**: `String`, date in year-month-day format

**done**: `function`, callback(err, response)

**Returns**: `Array`, - returns list of bus route details


### getBusPositions(id, variation, loc, radius, done) 

[getBusPositions description]

**Parameters**

**id**: `String`, Route ID

**variation**: `String`, bool in string format

**loc**: `Object`, coordinates in object format loc.lat, loc.lon

**radius**: `Number`, radius in meters of bus positions

**done**: `function`, callback(err, response)

**Returns**: `Array`, - returns list of bus positions


### getBusScheduleByStop(id, date, done) 

Get bus schedules by stops

**Parameters**

**id**: `String`, bus stopID

**date**: `String`, data in year-month-day format

**done**: `function`, callback(err, response)

**Returns**: `Array`, - returns list of schedules by stop


### getBusPrediction(id, done) 

Get bus predictions

**Parameters**

**id**: `String`, bus stopID

**done**: `function`, callback(err, response)

**Returns**: `Array`, - returns list of predictions


### getClosestStationsPrediction(loc, radius, limit, done) 

Get station predictions based on the closest stations given a location. Great for getting predictions, without nowing the stations within a location.

**Parameters**

**loc**: `Object`, coordinates in object format loc.lat, loc.lon

**radius**: `Number`, radius in meters

**limit**: `Number`, max amount of stations to include

**done**: `function`, callback(err, response)

**Returns**: `Array`, - returns list of bus station predictions, sorted by closest to location provided


### getBusPredictionSeries(arr, done) 

Get bus predictions, in a series. Great if you have a list of stations, and need to get predictions for all of them.

**Parameters**

**arr**: `Array`, list of station ids

**done**: `function`, callback(err, response)

**Returns**: `Array`, - returns list of corresponding predictions



---
### Examples

```js
var Bus = require('wmata-bus-js');
var client = new Bus('api key here');
var location = {
  lat: 41,
  lon: 39
}

client.getBusRoutes(function(err, data) {
  // do something with data
});

client.getBusStops(location, '500', function(err, data) {
  // do something with data
});

client.getBusScheduleByRoute('16L', '2014-09-19', 'false', function(err, data) {
  // do something with data
});

client.getBusRouteDetails('16L', '2014-09-19', function(err, data) {
  // do something with data
});

client.getBusPositions('10A', 'true', location, 500, function(err, data) {
  // do something with data
});

client.getBusScheduleByStop('2000019', '2014-09-19', function(err, data) {
  // do something with data
});

client.getBusPrediction('1001343', function(err, data) {
  // do something with data
});

client.getClosestPrediction(location, 500, 3, function(err, data) {
  // do something with data
});
```