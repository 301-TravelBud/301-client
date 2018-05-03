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
    this.start_date = this.start_date.slice(0, 10);
    this.end_date = this.end_date.slice(0, 10);
  }
  Trip.all = [];
  Trip.prototype.toHtml = function(htmlID) {
    var template = Handlebars.compile($(htmlID).text());
    return template(this);
  };
  Trip.currentUser = {};
  Trip.addUser = {};

  Trip.createAccount = (callback) => {
    Trip.addUser = {
      username: $('#username').val(),
      password: $('#password').val(),
      email: $('#userEmail').val()
    };
    console.log(Trip.addUser, 'in create account 1');
    Trip.newUser(Trip.addUser, callback);
  };

  Trip.newUser = (obj, callback) => {
    $.get(`${ENV.apiUrl}/login`)
      .then(exists => {
        if(parseInt(exists) === 1) {
          console.log('pls pick a different name');
        } else {
          console.log('new user', obj);
          Trip.currentUser = obj;
          console.log(Trip.currentUser, 'its me current user');
          $.post(`${ENV.apiUrl}/createuser`, {
            user_name: Trip.currentUser.username,
            password: Trip.currentUser.password,
            email: Trip.currentUser.email});
          console.log('new user created');
          callback();
        }
      }
      );};

  Trip.userCheck = (callback) => {
    const check = {
      username: $('#username').val(),
      password: $('#password').val(),
      email: $('#userEmail').val()
    };
    Trip.adminCheck(check, callback);
  };

  Trip.adminCheck = (obj, callback) => {
    $.get(`${ENV.apiUrl}/admin`)
      .then(results => {
        console.log(results);
        for (let i in results) {
          if (results[i].user_name == obj.username && results[i].password == obj.password) {
            Trip.currentUser = results[i];

            console.log('current user here ->', Trip.currentUser);
          } else {
            $('#wrong').show();
          }
        }
      })
      .then(callback)
      .catch(errorCallback);
  };


  Trip.adminView = (callback) => {
    console.log('hit admin view');
    callback();
  };


  Trip.initIndexPage = function(ctx, next) {
    console.log('initindexpage');
    $('.page').hide();
    $('#test').show();
    Trip.all.forEach(trip =>
      $('#trip-list').append(trip.toHtml('#trip-table-template')));
  };
  Trip.initTripView = function(ctx, next) {
    console.log('initTripView');
    $('.page').hide();
    $('#trip-view').show();
  };

  Trip.initAboutUsView = function(ctx, next) {
    console.log('aboutusview');
    $('.page').hide();
    $('#aboutus').show();

  };

  Trip.fetchAll = callback => {
    $.get(`${ENV.apiUrl}/trips`)
      .then(Trip.loadAll)
      .then(callback)
      .catch(console.error);
  };

  Trip.loadAll = rows => {
    Trip.all = rows.map(trip => new Trip(trip));
  };

  Trip.hideModal = () => {
    $('#modal').css('display', 'none');
  };


  module.Trip = Trip;
})(app);

