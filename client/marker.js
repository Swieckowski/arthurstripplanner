const mapboxgl = require("mapbox-gl");

function markerFactory (type, LonLatarr) {
  const marker = document.createElement('div');
  marker.style.width = "32px";
  marker.style.height = "39px";

  if (type === 'activity') {
    marker.style.backgroundImage = 'url(http://i.imgur.com/WbMOfMl.png)';
  } else if (type === 'hotel') {
    marker.style.backgroundImage = 'url(http://i.imgur.com/D9574Cu.png)';
  } else if (type === 'restaurant') {
    marker.style.backgroundImage = 'url(http://i.imgur.com/cqR6pUI.png)';
  }

  return new mapboxgl.Marker(marker).setLngLat(LonLatarr);
}

function selector (attractions, type, id){
  const attractionArr = attractions[type];
  for (var i = 0; i < attractionArr.length; i++) {
    if(attractionArr[i].id === parseInt(id)){
      return attractionArr[i];
    }
  }
  return null;
}

module.exports = {
  markerFactory: markerFactory,
  selector: selector
}
