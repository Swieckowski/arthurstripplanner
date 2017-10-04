const mapboxgl = require("mapbox-gl");
const markerFactory = require('./marker.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiYXZpbGxhcnJlYWwwMSIsImEiOiJjajhicnJ4ZXUwMWIyMnFybG8ydmk1ajdpIn0.zFonWc7d_835Jqa1S2_RUg';

const map = new mapboxgl.Map({
  container: "map",
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const marker = markerFactory('hotel', -74.009151, 40.705086);
marker.addTo(map);

const hotelsSelect = document.getElementById('hotels');
const restaurantsSelect = document.getElementById('restaurants');
const activitiesSelect = document.getElementById('activities');
let attractions;

fetch('/api/attractions')
.then(result => result.json())
.then(data => {
  console.log(data);
  attractions = data;
  populate(data);
})
.catch(console.error);

function populate (attractions) {
  attractions.hotels.forEach(function (hotel) {
    var opt = document.createElement("option");
    opt.setAttribute("value", hotel.id);
    opt.append(hotel.name);
    hotelsSelect.append(opt);
  });
  attractions.restaurants.forEach(function (restaurants) {
    var opt = document.createElement("option");
    opt.setAttribute("value", restaurants.id);
    opt.append(restaurants.name);
    restaurantsSelect.append(opt);
  });
  attractions.activities.forEach(function (activities) {
    var opt = document.createElement("option");
    opt.setAttribute("value", activities.id);
    opt.append(activities.name);
    activitiesSelect.append(opt);
  });
}