

page('/' ,(ctx, next) => app.Trip.fetchAll(app.Trip.initIndexPage));

// page('/trip', (ctx, next) => app.Trip.fetchAll(app.tripView.initTripView));
page('/admin', () => app.Trip.userCheck(app.Trip.hideModal));

page('/addtrip', () => app.Trip.fetchAll(app.tripView.initTripView));
page();
page('/createuser', () => app.Trip.createAccount(app.Trip.hideModal));

$('#add-trip').on('submit', app.tripView.addNewTrip);
