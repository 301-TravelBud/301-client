'use strict';

//Display map and Marker
let city = 'code fellows';

function initMap() {

  var merica = {lat: 82, lng: 40};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: merica
  });}

var modal = document.getElementById('modal');

// Get the button that opens the modal
var btn = document.getElementById('myBtn');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

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

