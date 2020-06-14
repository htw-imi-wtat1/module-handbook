// needs to use superagent via agent for persistent session cookies
const { randomUserData } = require('./userData')
const User = require('../../app/models/user')

module.exports = {
  loginPassport: async (agent, userData = randomUserData()) => {
    const user = await User.register(new User(userData), userData.password)
    await agent
      .post('/users/login')
      .send({
        email: userData.email,
        password: userData.password
      })
    return user
  },
  logoutPassport: async (agent) => {
    await agent
      .get('/users/logout')
  }
}
