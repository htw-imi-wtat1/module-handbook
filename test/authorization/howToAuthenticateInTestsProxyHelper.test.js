'use strict;'

const { app, request } = require('../commonJest')
const { loginProxy, logoutProxy } = require('../helper/loginProxy')

describe('or define & reuse a method with a real user', () => {
  let user
  beforeEach(async (done) => {
    user = await loginProxy(app)
    done()
  })
  it('status shows ok', (done) => {
    request(app)
      .get('/authorizationPlayground/status')
      .expect('Logged in: ' + user.fullName, done)
  })
  it('there is also an logout', (done) => {
    logoutProxy(app)
    request(app)
      .get('/authorizationPlayground/status')
      .expect('Not logged in', done)
  })
})
