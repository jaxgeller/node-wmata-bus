# wmata-bus-js

[![Build Status](https://travis-ci.org/jacksongeller/wmata-bus.js.svg?branch=master)](https://travis-ci.org/jacksongeller/wmata-bus.js)

### Install 
`$ npm install wmata-bus-js --save`

---
### Use
1. Get API key
2. Init client

```js
var Bus = require('wmata-bus-js');
var client = new Bus('api key here');
```

---
### API

#### client.getBusRoutes(callback)
+ `callback(err, data)`
+ returns all bus routes

#### client.getBusStops(location, radius, callback)
+ `location` object `{lat: number, lon: number}`
+ `radius` number
+ `callback(err, data)`
+ returns closest bustops given a location and radius

#### client.getBusScheduleByRoute(id, date, variation, callback)
+ `id` string
+ `date` string (dash delimeted)
+ `variation` string of a bool
+ `callback(err, data)`
+ returns bus schedules given a specific bus id

#### client.getBusRouteDetails(id, date, callback)
+ `id` string
+ `date` string (dash delimeted)
+ `callback(err, data)`
+ returns bus route details given a specific bus id

#### client.getBusPositions(id, variation, location, radius, callback)
+ `id` string
+ `variation` string of a bool
+ `location` object `{lat: number, lon: number}`
+ `radius` number
+ `callback(err, data)`
+ returns bus positions of a specific area

#### client.getBusScheduleByStop(id, date, callback)
+ `id` string
+ `date` string (dash delimeted)
+ `callback(err, data)`
+ returns bus schedules during a spefic date for a specific bus

#### client.getBusPrediction(id, callback)
+ `id` string
+ `callback(err, data)`
+ returns bus predictions for a specific bus

---
### Examples

```js
var Bus = require('wmata-bus-js');
var client = new Bus('api key here');

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

```