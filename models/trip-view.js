'use strict';

var app = app || {}

(function (module){

  const tripView = {};

  function show(section) {
    $('section').not(`#${section}`).hide();
    $(`#${section}`).show();
  }

  Trip.initIndexPage = function(ctx) {
    $('#triplist').empty();
    $('#trip-view').show();
    Trip.all.forEach(trip => $('#trip-list').append(trip.toHtml('#trip-table-template')));
  };


  $('#submitTrip').on('submit', addNewTrip);

  function addNewTrip(event) {
    event.preventDefault();
    let trip = {
      country: event.target.country.value,
      city: event.target.country.value,
      start_date: event.target.start_date.value,
      end_date: event.target.end_date.value
    };
    $.post(`${ENV.apiUrl}/trips`, trip)
      .then(app.Trip.fetchAll(tripView.initIndexPage))
      .catch(console.error);
    addTripPage();
  }

  function addTripPage(event) {
    event.preventDefault();
    var endOfUrl = window.location.pathname;
    var n = endOfUrl.lastIndexOf('/');
    var currID = endOfUrl.substring(n + 1);
    page(`/trips/${currID}`);
  }


  module.tripView = tripView;

})(app);