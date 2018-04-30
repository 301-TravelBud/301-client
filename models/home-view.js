'use strict';

//Display map and Marker
let city = 'code fellows';

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {zoom: 6});
  const geocoder = new google.maps.Geocoder;
  const travelDetail= city + ' marker comments goes in here';
  const infowindow = new google.maps.InfoWindow({
    content: travelDetail
  });

  geocoder.geocode({'address': city}, function(results, status) {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);

      const marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: map
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    }
  });
}