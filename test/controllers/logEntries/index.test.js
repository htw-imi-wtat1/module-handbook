const { app, User, request, id } = require('../../commonJest')
describe('logEntry list is shown in user show', () => {
  let userId
  let userData
  beforeEach((done) => {
    userData = {
      name: { first: 'Jule', last: 'Niklaus' },
      email: `Jule_${id()}@yahoo.com`,
      zipCode: 65019,
      password: 'Ffit82AW5EvioKC',
      logBook: [{
        course: 'B08',
        event: 'passed',
        date: '2020-05-21',
        semester: 4,
        notes: 'notes about course'
      }, {
        course: 'M08',
        event: 'planned',
        date: '2020-06-13',
        semester: 1,
        notes: 'notes about this othercourse'
      }]
    }
    User.create(userData).then(user => {
      userId = user.id
      done()
    }).catch(e => done(e))
  })
  it('shows logEntries in user show', (done) => {
    request(app)
      .get(`/users/${userId}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        const body = res.text
        for (const logEntry of userData.logBook) {
          expect(body).toContain(logEntry.course)
          expect(body).toContain(logEntry.semester)
          expect(body).toContain(logEntry.event)
          expect(body).toContain(new Date(logEntry.date))
          expect(body).toContain(logEntry.notes)
        }
        done()
      })
  })
})
