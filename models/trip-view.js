'use strict';

var app = app || {};


(function (module){
  $('#navTrips').on('click', function (event){
    event.preventDefault();
    tripView.initIndexPage();
  });

  let tripView = {};



  tripView.initIndexPage = function(ctx) {
    $('#triplist').empty();
    $('#trip-view').show();
    app.Trip.all.forEach(trip => {


      $('#trip-list').append(trip.toHtml('#trip-table-template'));
    });
  };



  tripView.addNewTrip = function(event) {
    event.preventDefault();
    let trip = {
      user_id: app.Trip.currentUser.user_id,
      country: event.target.country.value,
      city: event.target.city.value,
      start_date: event.target.start_date.value,
      end_date: event.target.end_date.value
    };
    $.post(`${ENV.apiUrl}/addtrip`, trip)
      .then(app.Trip.fetchAll(tripView.initIndexPage))
      .catch(console.error);
  };

  // tripView.addTripPage = function () {
  //   $('#map').hide();
  // };


  module.tripView = tripView;

})(app);