const express = require("express");
const router = express.Router();
const {db, Hotel, Place, Restaurant, Activity} = require("../models");

router.get('/attractions', function(req, res, next) {
    var allAttractions = {};
    Hotel.findAll({ include: [{ all: true }]})
    .then(function(hotels) {
      allAttractions.hotels = hotels;
      return Restaurant.findAll({ include: [{ all: true }]});
    })
    .then(function(restaurants) {
      allAttractions.restaurants = restaurants;
      return Activity.findAll({ include: [{ all: true }]});
    })
    .then(function(activities) {
      allAttractions.activities = activities;
    })
    .then(function() {
      res.json(allAttractions);
    })
    .catch(next);
});

module.exports = router;