
const { app, request, login, logout, randomUserData } = require('../commonJest')

describe('or define & reuse a method with a real user', () => {
  let user
  beforeEach(async (done) => {
    user = await login(randomUserData())
    done()
  })
  it('status shows ok', (done) => {
    request(app)
      .get('/authorizationPlayground/status')
      .expect('Logged in: ' + user.fullName, done)
  })
  it('there is also an logout', (done) => {
    logout()
    request(app)
      .get('/authorizationPlayground/status')
      .expect('Not logged in', done)
  })
})
