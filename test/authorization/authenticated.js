const { app, User, request, id } = require('../commonJest')
const server = request.agent(app)
const httpStatus = require('http-status-codes')

describe('without being logged in', () => {
  it('open returns ok', done => {
    request(app)
      .get('/authorizationPlayground/open')
      .expect(httpStatus.OK, done)
  })
  it('restricted returns 200', done => {
    request(app)
      .get('/authorizationPlayground/requiresLogin')
      .expect(httpStatus.UNAUTHORIZED, done)
  })
  it('restricted with redirect returns 200', done => {
    request(app)
      .get('/authorizationPlayground/requiresLoginWithRedirect')
      .expect(httpStatus.SEE_OTHER, done)
  })
})
describe('can log in', () => {
  it('works', async (done) => {
    const userData = {
      name: { first: 'Hannah', last: 'Fincke' },
      email: `timon.ringer_${id()}@gmail.com`,
      zipCode: 18458,
      password: 'geheim12'
    }
    await User.create(userData)
    // const { user } = await User.authenticate()(userData.email, userData.password)
    request(app).get('/users/logout3')
    request(app)
    // server
      .post('/users/login3')
      .send({
        // email: userData.email,
        email: 'asldf',
        password: userData.password
      })
    //  .expect(httpStatus.MOVED_TEMPORARILY)
      .expect('set-cookie', /connect.sid=.*; Path=\/; Expires=.*GMT; HttpOnly/)
      .then((response) => {
        expect(response.text).toBe('hallo2')
        expect(response.locals.loggedIn).toBe(true)
        expect(response.locals.currentUser).notToBe(nil)
        done()
      })
  })
})

describe('logged in', () => {
  beforeEach(async (done) => {
    const userData = {
      name: { first: 'Hannah', last: 'Fincke' },
      email: `timon.ringer_${id()}@gmail.com`,
      zipCode: 18458,
      password: 'geheim12'
    }
    await User.create(userData)
    // const { user } = await User.authenticate()(userData.email, userData.password)

    // request(app)
    server
      .post('/users/login')
      .send({
        email: userData.email,
        password: userData.password
      })
      .expect(httpStatus.MOVED_TEMPORARILY)
      .expect('set-cookie', /connect.sid=.*; Path=\/; Expires=.*GMT; HttpOnly/)
      .then((res) => {
        done()
      })
  })
  it('open returns ok', done => {
    request(app)
      .get('/authorizationPlayground/open')
      .expect(httpStatus.OK, done)
      .expect('set-cookie', /connect.sid=.*; Path=\/; Expires=.*GMT; HttpOnly/)
  })
  it('restricted returns ok', done => {
    // request(app)
    server
      .get('/authorizationPlayground/requiresLogin')
      .expect(httpStatus.OK, done)
      .expect('set-cookie', /connect.sid=.*; Path=\/; Expires=.*GMT; HttpOnly/)
  })
  it('restricted with redirect returns ok', done => {
    request(app)
      .get('/authorizationPlayground/requiresLoginWithRedirect')
      .expect(200, done)
  })
})
