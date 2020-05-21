const { app, User, request, id } = require('../../commonJest')
describe('logEntry list is shown in user show', () => {
  let user
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
    User.create(userData).then(u => {
      user = u
      done()
    }).catch(e => done(e))
  })
  it('shows logEntries in user show', (done) => {
    request(app)
      .get(`/users/${user.id}`)
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
  it('deletes log entry', (done) => {
    const firstLogEntryId = user.logBook[0].id
    request(app)
      .delete(`/users/${user.id}/log_entries/${firstLogEntryId}`)
      .expect(303)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(user.logBook.length).toBe(2)

        done()
      })
  })
})
