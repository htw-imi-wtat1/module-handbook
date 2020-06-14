const { app, request } = require('../commonJest')
const { loginPassport, logoutPassport } = require('../helper/loginPassport')
// needs to use superagent via agent for persistent session cookies
const agent = request.agent(app)

describe('or define & reuse a method with a real user', () => {
  let user
  beforeEach(async (done) => {
    user = await loginPassport(agent)
    done()
  })
  it('status shows ok', (done) => {
    agent
      .get('/authorizationPlayground/status')
      .expect('Logged in: ' + user.fullName, done)
  })
  it('there is also an logout', async (done) => {
    await logoutPassport(agent)
    agent
      .get('/authorizationPlayground/status')
      .expect('Not logged in', done)
  })
})
