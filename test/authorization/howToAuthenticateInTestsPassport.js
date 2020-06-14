const { app, User, request, randomUserData } = require('../commonJest')
// needs to use superagent via agent for persistent session cookies
const agent = request.agent(app)

describe('passport: jest with authenticated user', () => {
  let user
  beforeAll(async (done) => {
    const userData = randomUserData()
    user = new User(userData)
    User.register(user, userData.password, (error, user) => {
      if (error) { done(error) }
      agent
        .post('/users/login')
        .send({
          email: userData.email,
          password: userData.password
        })
        .then(res => {
          done()
        })
    })
  })

  it('is authenticated', (done) => {
    agent
      .get('/authorizationPlayground/status')
      .expect('Logged in: ' + user.fullName, done)
  })
  it('is still authenticated', (done) => {
    agent
      .get('/authorizationPlayground/status')
      .expect('Logged in: ' + user.fullName, done)
  })
})
