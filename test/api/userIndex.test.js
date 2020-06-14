const { app, User, request, randomUserData } = require('../commonJest')

describe('API: user list', async function () {
  const users = []
  const userCount = 5
  const userData = []
  beforeAll(async () => {
    for (let i = 0; i < userCount; i = i + 1) {
      const ud = randomUserData()
      userData.push(ud)
      users.push(await User.create(ud))
    }
  })
  it('show ok on /api/users', function (done) {
    request(app)
      .get('/api/users')
      .expect(200, done)
  })
  it('show all courses in db', function (done) {
    request(app)
      .get('/api/users')
      .then((response) => {
        const body = response.text
        for (const user of users) {
          expect(body).toContain(user.name.first)
          expect(body).toContain(user.email)
        }
        done()
      })
  })
  it('explore json', async function (done) {
    const allUsers = await User.find({})
    const numberOfUsers = allUsers.length
    request(app)
      .get('/api/users')
      .then((response) => {
        expect(response.body.data.users.length).toBe(numberOfUsers)
        done()
      })
  })
})
