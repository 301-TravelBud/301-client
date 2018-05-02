

page('/' ,(ctx, next) => app.Trip.fetchAll(app.Trip.initIndexPage));

// page('/trip', (ctx, next) => app.Trip.fetchAll(app.tripView.initTripView));

page('/addtrip', (ctx, next) => app.Trip.fetchAll(app.tripView.initTripView));

page();

$('#add-trip').on('submit', app.tripView.addNewTrip);
