'use strict';

//Display map
function initMap() {
  var merica = {lat: 82, lng: 40};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: merica
  });}