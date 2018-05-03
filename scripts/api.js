'use strict';

var app = app || {};

(function(module){

  function Marker(data){
    Object.keys(data).forEach( key => this[key] = data[key]);
  }
  Marker.all = [];

  function loadMarkers(data) {
    Marker.all = data.map(info => new Marker(info));
    initMap();
  }

  Marker.mapMarkers = callback => {
    $.get(`${ENV.apiUrl}/markers`)
      .then( results => loadMarkers(results))
      .then(callback)
      .catch(console.error);
  };


  function initMap(){
    const map = new google.maps.Map(document.getElementById('map'), {zoom: 6});
    const geocoder = new google.maps.Geocoder;

    for(let i in Marker.all){

      geocoder.geocode({'address': `${Marker.all[i].city} ${Marker.all[i].country}`}, function(results, status) {

        if (status === 'OK') {
          const travelDetail= `<h2>${Marker.all[i].city}</h2> <p>Location: ${Marker.all[i].city}, ${Marker.all[i].country}</p><p>Would you like to travel with ${Marker.all[i].user_name}?</p><p>from ${Marker.all[i].start_date} to ${Marker.all[i].end_date}</p><p>If so, contact ${Marker.all[i].user_name} at ${Marker.all[i].email} RIGHT NOW!</p>` ;


          const infowindow = new google.maps.InfoWindow({
            content: travelDetail
          });
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

  }
  Marker.mapMarkers();
  module.Marker = Marker;
})(app);