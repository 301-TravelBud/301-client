

page('/', (ctx, next) => app.Trip.fetchAll(app.Trip.initIndexPage()));

page('/admin', () => app.Trip.userCheck(app.Trip.hideModal));


page('/aboutus', (ctx, next) => app.Trip.initAboutUsView());

page('/addtrip', () => app.Trip.fetchAll(app.tripView.initTripView));

page();
page('/createuser', () => app.Trip.createAccount(app.Trip.hideModal));

$('#add-trip').on('submit', app.tripView.addNewTrip);
