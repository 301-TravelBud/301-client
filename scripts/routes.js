

page('/', () => app.Trip.fetchAll(app.Trip.initIndexPage()));

page('/admin', () => app.Trip.adminView(app.Trip.userCheck(app.Trip.hideModal)));
// page('/admin', () => app.Trip.userCheck(app.Trip.hideModal));

page('/addtrip', () => app.Trip.fetchAll(app.Trip.initTripView()));

page('/aboutus', () => app.Trip.initAboutUsView());

page('/addtrip', () => app.Trip.fetchAll(app.tripView.initTripView));

page();
page('/createuser', () => app.Trip.createAccount(app.Trip.hideModal));

$('#add-trip').on('submit', app.tripView.addNewTrip);
