const { app, User, request, id } = require('../commonJest')
const server = request.agent(app)
const agent = request.agent(app)
const httpStatus = require('http-status-codes')

function logIn () {

}
describe('can log in', () => {
  it('status', done => {
    agent
      .get('/authorizationPlayground/status')
      .expect('Not logged in', done)
  })
  it('works', async (done) => {
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
        expect(response.text).toBe('Found. Redirecting to /users/login')
      })
    agent
      .get('/authorizationPlayground/status')
      .expect('Not logged in', done)
    agent
      .get('/authorizationPlayground/status')
      .expect('Not logged in', done)
  })
})
