const { app, User, request, id } = require('../commonJest')
describe('logEntry list is shown in user show', () => {
  let user
  let logEntryId
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
      logEntryId = u.logBook[0].id
      done()
    }).catch(e => done(e))
  })
  it('renders new', () => {
    return request(app)
      .get(`/users/${user.id}/log_entries/new`)
      .expect(200)
  })
  it('renders edit', () => {
    return request(app)
      .get(`/users/${user.id}/log_entries/${logEntryId}/edit`)
      .expect(200)
  })
})
