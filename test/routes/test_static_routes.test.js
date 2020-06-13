
const { app, request } = require('../commonJest')

describe('smoketest static routes', function () {
  it('it finds the css', function (done) {
    request(app)
      .get('/css/module_handbook.css')
      .expect(200, done)
  })
  it('it finds stuff in node modules', function (done) {
    request(app)
      .get('/js/bootstrap.min.js')
      .expect(200, done)
  })
})
