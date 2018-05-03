

page('/', (ctx, next) => app.Trip.fetchAll(app.Trip.initIndexPage()));

// page('/trip', (ctx, next) => app.Trip.fetchAll(app.tripView.initTripView));
page('/admin', (ctx, next) => app.Trip.adminView(app.Trip.userCheck(app.Trip.hideModal)));


page('/addtrip', (ctx, next) => app.Trip.fetchAll(app.Trip.initTripView()));


page('/aboutus', (ctx, next) => app.Trip.initAboutUsView());

page();
page('/createuser', (ctx, next) => app.Trip.createAccount(app.Trip.hideModal));

$('#add-trip').on('submit', app.tripView.addNewTrip);
