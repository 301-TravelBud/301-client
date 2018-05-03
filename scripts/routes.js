page('/'
  ,(ctx, next) => app.Trip.fetchAll(app.Trip.initIndexPage));
page('/admin', (ctx, next) => app.Trip.adminView(app.Trip.userCheck));


page();