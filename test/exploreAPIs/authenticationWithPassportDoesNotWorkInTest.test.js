const { app, User, request, id } = require('../commonJest')

const agent = request.agent(app)

function sessionCookie (response) {
  if (response.headers['set-cookie'] === undefined) {
    return 'no cookies set'
  }
  return response.headers['set-cookie'].find((s) => s.startsWith('connect.sid'))
}
let firstSessionCookie = ''
it('authentication does not work in tests using passport', async (done) => {
  const userData = {
    name: { first: 'Hannah', last: 'Fincke' },
    email: `timon.ringer_${id()}@gmail.com`,
    zipCode: 18458,
    password: 'geheim12'
  }
  await User.create(userData)

  await agent
    .post('/users/login')
    .send({
      email: userData.email,
      password: userData.password
    })
    //  .expect(httpStatus.MOVED_TEMPORARILY)
    .expect('set-cookie', /connect.sid=.*; Path=\/; Expires=.*GMT; HttpOnly/)
    .then((response) => {
      // the authentication returned a Found - no matter what.
      expect(response.text).toBe('Found. Redirecting to /users/login')
      // yet, the user is not set on the response
      expect(response.user).toBe(undefined)
      // expect(response.locals.currentUser).toBe('')
      // store the session cookie.
      firstSessionCookie = sessionCookie(response)
    })
  await agent
    .get('/authorizationPlayground/status')
    .expect('Not logged in')
    .then((response) => {
      // yet, the session works for one further request:
      expect(sessionCookie(response)).toBe(firstSessionCookie)
    })
  await agent
    .get('/authorizationPlayground/status')
    .expect('Not logged in')
    .then((response) => {
      // and here, the session is gone.
      expect(sessionCookie(response)).toBe('no cookies set')
    })
  done()
})
