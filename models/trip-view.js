'use strict';

var app = app || {};


(function (module){
  // $('#navTrips').on('click', function (event){
  //   event.preventDefault();
  //   tripView.initIndexPage();
  // });

  let tripView = {};

  function show(section) {
    // $('section').not(`#${section}`).hide();
    $(`#${section}`).show();
  }

  tripView.initIndexPage = function(ctx) {
    $('td').text('');
    $('#triplist').hide();
    $('#trip-view').show();
    // $('#map').hide();
    app.Trip.all.forEach(trip => {


      $('#trip-list').append(trip.toHtml('#trip-table-template'));
    });

  };



  tripView.addNewTrip = function(event) {
    event.preventDefault();
    let trip = {
      country: event.target.country.value,
      city: event.target.city.value,
      start_date: event.target.start_date.value,
      end_date: event.target.end_date.value
    };
    $.post(`${ENV.apiUrl}/addtrip`, trip)
      .then(app.Trip.fetchAll(tripView.initIndexPage))
      .catch(console.error);

  };




  module.tripView = tripView;

})(app);