'use strict';

var app = app || {};


(function (module){
  let tripView = {};

  tripView.initIndexPage = function() {
    // $('table').empty();
    $('.table-container').empty();

    app.Trip.all.forEach(trip => {
      $('#trip-list').append(trip.toHtml('#trip-table-template'));
    });
  };

  // tripView.addNewTrip = function(event) {
  //   event.preventDefault();
  //   let trip = {
  //     country: event.target.country.value,
  //     city: event.target.city.value,
  //     start_date: event.target.start_date.value,
  //     end_date: event.target.end_date.value
  //   };
  //   $.post(`${ENV.apiUrl}/addtrip`, trip)
  //     .then(app.Trip.fetchAll(tripView.initIndexPage))
  //     .catch(console.error);
  // };

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
      // .then(app.Trip.fetchAll(tripView.initIndexPage))
      .then(page('/'))
      .catch(console.error);
  };



  module.tripView = tripView;

})(app);