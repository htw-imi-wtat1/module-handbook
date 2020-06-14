
const { app, request } = require('../commonJest')

describe('simply overwrite the authProxy functions', () => {
  app.request.authProxyUser = function () {
    return { fullName: 'Finn Haferkamp' }
  }
  app.request.authProxyIsAuthenticated = function () {
    return true
  }
  it('status shows ok', (done) => {
    request(app)
      .get('/authorizationPlayground/status')
      .expect('Logged in: Finn Haferkamp', done)
  })
})
