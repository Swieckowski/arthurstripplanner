const mapboxgl = require("mapbox-gl");
const markerFactory = require('./marker.js').markerFactory;
const selector = require('./marker.js').selector;


mapboxgl.accessToken = 'pk.eyJ1IjoiYXZpbGxhcnJlYWwwMSIsImEiOiJjajhicnJ4ZXUwMWIyMnFybG8ydmk1ajdpIn0.zFonWc7d_835Jqa1S2_RUg';

const map = new mapboxgl.Map({
  container: "map",
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const hotelsSelect = document.getElementById('hotels');
const restaurantsSelect = document.getElementById('restaurants');
const activitiesSelect = document.getElementById('activities');
let attractions;
const itinerary = {
  activities: [],
  hotels: [],
  restaurants: []
};

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

document.getElementById('hotel-button')
  .addEventListener('click', () => {

    if (selector(itinerary, "hotels", hotelsSelect.value) === null){
      const hotel = selector(attractions,"hotels", hotelsSelect.value);
      const marker = markerFactory('hotel', hotel.place.location);
      marker.addTo(map);
      itinerary.hotels.push(hotel);
      console.log(itinerary.hotels);
    }
  });

document.getElementById('restaurant-button')
  .addEventListener('click', () => {
    if (selector(itinerary, "restaurants", restaurantsSelect.value) === null){
      const restaurant = selector(attractions,"restaurants", restaurantsSelect.value);
      const marker = markerFactory('restaurant', restaurant.place.location);
      marker.addTo(map);
      itinerary.restaurants.push(restaurant);
      console.log(itinerary.restaurants);
    }
  });

document.getElementById('activity-button')
  .addEventListener('click', () => {
    if (selector(itinerary, "activities", activitiesSelect.value) === null){
      const activity = selector(attractions,"activities", activitiesSelect.value);
      const marker = markerFactory('activity', activity.place.location);
      marker.addTo(map);
      itinerary.activities.push(activity);
      console.log(itinerary.activities);
    }
  });






