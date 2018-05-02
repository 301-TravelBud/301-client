'use strict';

var app = app || {};


(function (module){
console.log('iffe')
  let tripView = {};

  function show(section) {
    $('section').not(`#${section}`).hide();
    $(`#${section}`).show();
  }

  tripView.initIndexPage = function(ctx) {
    $('#triplist').empty();
    $('#trip-view').show();
    app.Trip.all.forEach(trip => $('#trip-list').append(trip.toHtml('#trip-table-template')));
  };




  tripView.addNewTrip = function(event) {
    console.log('addnewtrip')
    event.preventDefault();
    let trip = {
      country: event.target.country.value,
      city: event.target.country.value,
      start_date: event.target.start_date.value,
      end_date: event.target.end_date.value
    };
    console.log('test' + trip);
    $.post(`${ENV.apiUrl}/addtrip`, trip)
      .then(app.Trip.fetchAll(tripView.initIndexPage))
      .catch(console.error);
    tripView.addTripPage();
  }

  tripView.addTripPage = function () {
   
    page(`/trips/${currID}`);
  }


  module.tripView = tripView;

})(app);