

page('/', () => app.Trip.fetchAll(app.Trip.initIndexPage()));

page('/admin', () => app.Trip.userCheck(app.Trip.hideModal));


page('/aboutus', () => app.Trip.initAboutUsView());

page('/addtrip', () => app.Trip.initTripView());

page();
page('/createuser', () => app.Trip.createAccount(app.Trip.hideModal));

$('#add-trip').on('submit', app.tripView.addNewTrip);
