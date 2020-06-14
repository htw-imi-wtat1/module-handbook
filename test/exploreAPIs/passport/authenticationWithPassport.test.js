const { app, User, request, id } = require('../../commonJest')
const { sessionCookie } = require('../../helper/sessionCookie')
const agent = request.agent(app)

let firstSessionCookie = ''

describe('passport', () => {
  let userData
  beforeAll(async (done) => {
    userData = {
      name: { first: 'Hannah', last: 'Fincke' },
      email: `timon.ringer_${id()}@gmail.com`,
      zipCode: 18458,
      password: 'geheim12'
    }
    const newUser = new User(userData)
    User.register(newUser, userData.password, (e, user) => {
      if (user) {
        done()
      } else {
        done(e)
      }
    })
  })

  it('authentication with passport via post', async (done) => {
    await agent
      .post('/users/login')
      .send({
        email: userData.email,
        password: userData.password
      })
      .then((response) => {
        expect(response.text).toBe('Found. Redirecting to /')
        firstSessionCookie = sessionCookie(response)
      })
    await agent
      .get('/authorizationPlayground/status')
      .expect('Logged in: Hannah Fincke')
      .then((response) => {
      // yet, the session works for one further request:
        expect(sessionCookie(response)).toBe(firstSessionCookie)
      })
    await agent
      .get('/authorizationPlayground/status')
      .expect('Logged in: Hannah Fincke')
      .then((response) => {
      // and here, the session is gone.
        expect(sessionCookie(response)).toBe('no cookies set')
      })
    done()
  })
})
