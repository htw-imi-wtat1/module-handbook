const { app, request } = require('../commonJest')
const httpStatus = require('http-status-codes')

describe('unauthenticated', () => {
  it('status', done => {
    request(app)
      .get('/authorizationPlayground/status')
      .expect('Not logged in', done)
  })
  it('open returns ok', done => {
    request(app)
      .get('/authorizationPlayground/open')
      .expect(httpStatus.OK, done)
  })
  it('restricted', done => {
    request(app)
      .get('/authorizationPlayground/requiresLogin')
      .expect(httpStatus.UNAUTHORIZED, done)
  })
  it('restricted with redirect', done => {
    request(app)
      .get('/authorizationPlayground/requiresLoginWithRedirect')
      .expect(httpStatus.SEE_OTHER, done)
  })
})
