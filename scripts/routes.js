

page('/', (ctx, next) => app.Trip.fetchAll(app.Trip.initIndexPage));

// page('/trip', (ctx, next) => app.Trip.fetchAll(app.tripView.initTripView));
page('/admin' ,(ctx, next) => app.Trip.adminView(app.Trip.userCheck));

page('/addtrips' ,(ctx, next) => app.Trip.initTripView());
// page('/alltrips', (ctx, next) => app.Trip.fetchAll(app.Trip.initIdexPage));
page();

$('#add-trip').on('submit', app.tripView.addNewTrip);
