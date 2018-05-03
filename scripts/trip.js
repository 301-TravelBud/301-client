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
  Trip.currentUser = {};


  //   Trip.createAccount = () => {
  //     const newUser = {
  //       username: $('#username').val(),
  //       password: $('#password').val(),
  //       email: $('#userEmail').val()
  //     };
  //     console.log($('#username').val());
  //     Trip.newUser(newUser);
  //   };

  //   Trip.newUser = (obj, callback) => {
  //     console.log(obj);
  //     $.get(`${ENV.apiUrl}/admin`)
  //       .then(results => {
  // for(let i in results) {
  //   if(results[i].includes(obj.username)) {
  //   console.log('pls pick a different name');
  // } else {
  //   currentUser = newUser
  //   $.post('/CreateUser', {user_name: currentUser.username, password: currentUser.password, email: currentUser.email})
  //   console.log('new user created')
  //           }
  // )});
  //   };

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
    $.get(`${ENV.apiUrl}/admin`)
      .then(results => {
        for (let i in results) {
          console.log(results[i]);
          if (results[i].user_name == obj.username && results[i].password == obj.password) {
            Trip.currentUser = results[i];
          } else {
            $('#wrong').toggle();
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
    $('#tripView').hide();
    Trip.all.forEach(trip =>
      $('#trip-list').append(trip.toHtml('#trip-table-template')));
  };

  Trip.fetchAll = callback => {
    $.get(`${ENV.apiUrl}/trips`)
      .then(Trip.loadAll)
      .then(callback)
      .catch(console.error);
  };

  Trip.loadAll = rows => {
    console.log(rows);
    Trip.all = rows.map(trip => new Trip(trip));
  };


  module.Trip = Trip;
})(app);

