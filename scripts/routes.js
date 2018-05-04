

page('/', () => app.Marker.mapMarkers(app.Trip.fetchAll(app.Trip.initIndexPage())));

page('/admin', () => app.Trip.userCheck(app.Trip.hideModal));

page('/addtrip', () => app.Trip.fetchAll(app.Trip.initTripView()));

page('/aboutus', () => app.Trip.initAboutUsView());
page('/trips', () => app.Trip.fetchAll() );

page();
page('/createuser', () => app.Trip.createAccount(app.Trip.hideModal));

$('#add-trip').on('submit', app.tripView.addNewTrip);
