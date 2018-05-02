'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://git.heroku.com/abad-app.git';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

//TODO: move page functions to route.js



(function (module){

  function Trip(data){

    Object.keys(data).forEach( key => this[key] = data[key]);
  }
  Trip.all = [];

  Trip.prototype.toHtml = function(htmlID) {
    var template = Handlebars.compile($(htmlID).text());
    return template(this);
  };

  Trip.initIndexPage = function(ctx, next) {

    Trip.all.forEach(trip =>
      $('#trip-list').append(trip.toHtml('#trip-table-template')));
  };

  Trip.fetchAll = callback => {
    $.get(`${ENV.apiUrl}/trips`)
      .then(Trip.loadAll)
      .then(callback)
      .catch(console.error);
  };
  // Trip.displayTrips


  Trip.loadAll = rows => {
    Trip.all = rows.map(trip => new Trip(trip));

  };




  module.Trip = Trip;
})(app);

