const { app, User, request, id } = require('../../commonJest')
const { dateViewFormat } = require('../../../app/helper/date')
describe('logEntry list is shown in user show', () => {
  let user
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
    User.create(userData).then(u => {
      user = u
      userId = u.id
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
          expect(body).toContain(dateViewFormat(logEntry.date))
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

  it('updates log entry', (done) => {
    const logEntryId = user.logBook[1].id
    const newData = {
      course: 'M08',
      event: 'passed',
      date: '2020-09-01',
      semester: 12,
      notes: 'finally'
    }
    request(app)
      .put(`/users/${user.id}/log_entries/${logEntryId}`)
      .send(newData)
      .expect(303)
      .then((res) => {
        User.findById(userId)
          .then(user => {
            expect(user).not.toBeNull()
            expect(user.logBook.length).toBe(2)
            const entry = user.logBook.id(logEntryId)
            expect(entry.course).toBe(newData.course)
            expect(entry.semester).toBe(newData.semester)
            expect(entry.event).toBe(newData.event)
            expect(Date.parse(entry.date)).toStrictEqual(Date.parse(newData.date))
            expect(entry.notes).toBe(newData.notes)
            done()
          })
      }).catch(e => done(e))
  })
})
