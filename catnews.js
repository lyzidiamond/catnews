// initialize map
var map = L.mapbox.map('cat-map', 'codeforamerica.h6ihl7do', {maxZoom: 10, minZoom: 4}).setView([37.770986,-122.446457], 13);

var cat = L.icon({
  iconUrl: './cat.png',
  iconSize: [35, 35]
});

function onEachFeature(feature, layer) {
  var popupContent = "<strong><a href='" + feature.properties.article_link + "'>" + feature.properties.article_headline +"</a></strong><br>" + feature.properties.article_desc;
  layer.bindPopup(popupContent);
  layer.on({
    click: function(e) {
      map.fitBounds(e.target.getBounds(), {reset: true});
    }
  });
};

$.getJSON('./catnews.geojson', function(data) {
  var locations = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {icon: cat});
    },
    onEachFeature: onEachFeature
  });
  locations.addTo(map);
  map.fitBounds(locations.getBounds(), {reset: true});
});