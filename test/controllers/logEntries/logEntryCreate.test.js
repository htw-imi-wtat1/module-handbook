const { app, User, request, id } = require('../../commonJest')

describe('logEntry create', function () {
  let userData
  let logEntry
  let user
  beforeEach(async () => {
    logEntry = {
      semester: '9',
      event: 'planned',
      notes: 'Some notes about the course',
      course: 'B06',
      date: '2020-05-21'
    }
    userData = {
      first: 'Finja',
      last: 'Maurer',
      email: `jolina_schumann_${id()}@gmail.com`,
      zipCode: 71467,
      password: 'geheim123'
    }
    user = await User.create(userData)
    logEntry.userId = user.id
  })
  it('date format', () => {
    expect(Date.parse('2020-05-21')).toStrictEqual(1590019200000)
  })
  it('appends logEntry to user', async function (done) {
    request(app)
      .post(`/users/${user.id}/log_entries`)
      .send(logEntry)
      .expect(302)
      .then((res) => {
        User.findOne({ email: userData.email })
          .then(user => {
            expect(user).not.toBeNull()
            expect(user.logBook.length).not.toBe(0)
            const entry = user.logBook[0]
            expect(entry.course).toBe('B06')
            expect(Date.parse(entry.date)).toStrictEqual(Date.parse('2020-05-21'))
            done()
          })
      }).catch(e => done(e))
  })
})
