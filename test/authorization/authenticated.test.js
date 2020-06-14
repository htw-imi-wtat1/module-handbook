const { app, request } = require('../commonJest')
const { loginProxy } = require('../helper/loginProxy')
const httpStatus = require('http-status-codes')

describe('logged in', () => {
  let user
  beforeEach(async (done) => {
    user = await loginProxy(app)
    done()
  })
  it('open returns ok', done => {
    request(app)
      .get('/authorizationPlayground/open')
      .expect('set-cookie', /connect.sid=.*; Path=\/; Expires=.*GMT; HttpOnly/)
      .expect(httpStatus.OK, done)
  })
  it('restricted returns 200', done => {
    request(app)
      .get('/authorizationPlayground/requiresLogin')
      .expect(httpStatus.OK, done)
  })
  it('restricted with redirect returns 200', done => {
    request(app)
      .get('/authorizationPlayground/requiresLoginWithRedirect')
      .expect(httpStatus.OK, done)
  })

  it('status', done => {
    request(app)
      .get('/authorizationPlayground/status')
      .expect('Logged in: ' + user.fullName, done)
  })
})
