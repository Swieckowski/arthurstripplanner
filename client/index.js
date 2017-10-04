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

fetch('/api/attractions')
.then(result => result.json())
.then(data => {
  console.log(data);
})
.catch(console.error);