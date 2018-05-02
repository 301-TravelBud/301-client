'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://git.heroku.com/abad-app.git';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;



(function (module){

  function Trip(data){

    Object.keys(data).forEach( key => this[key] = data[key]);
  }
  Trip.all = [];

  Trip.prototype.toHtml = function(htmlID) {
    var template = Handlebars.compile($(htmlID).text());
    return template(this);
  };
  let currentUser = {};
  // $('#new-trip-form').on('submit', Trip.userCheck);

  Trip.userCheck = () => {
    const check = {
      username: $('#username').val(),
      password: $('#password').val(),
      email: $('#userEmail').val()
    };
    console.log($('#username').val());
    Trip.adminCheck(check);
  };

  Trip.adminCheck = (obj) => {
    console.log(obj);
    console.log('in check');
    $.get(`${ENV.apiUrl}/admin`)
      .then(results => {
        console.log(results, 'rip me');
        for (let i in results) {
          console.log(results[i]);
          if (results[i].user_name == obj.username && results[i].password == obj.password) {
            currentUser = results[i];
            console.log(currentUser, 'woohoo');
            console.log('Found a match');
          } else {
            $('#wrong').toggle();
            console.log('Wrong username/pass');
          }
        }
        console.log(results);

      });
    //   .then(callback)
    //   .catch(errorCallback);
  };


  Trip.adminView = (callback) => {
    console.log('hit admin view');
    callback();
  };


  Trip.initIndexPage = function(ctx, next) {

    Trip.all.forEach(trip =>
      $('#trip-list').append(trip.toHtml('#trip-table-template')));
  };

  Trip.fetchAll = callback => {
    $.get(`${ENV.apiUrl}`)
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
