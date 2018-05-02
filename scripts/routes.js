console.log('app', app)
page('/'
  ,(ctx, next) => app.Trip.fetchAll(app.tripView.initIndexPage));

page();

$('#add-trip').on('submit', app.tripView.addNewTrip);
