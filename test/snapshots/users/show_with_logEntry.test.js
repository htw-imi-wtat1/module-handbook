const { app, User, request, removeIDs, id } = require('../../commonJest')

describe('User Index', function () {
  const randId = id()
  const userData = {
    name: { first: 'Enes', last: 'Niklaus' },
    email: `Enes_${randId}@yahoo.com`,
    zipCode: 94577,
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
  let userID // this is shared state between all tests!
  let user
  beforeAll(function (done) {
    User.create(userData)
      .then(created => {
        userID = created.id
        user = created
        done()
      })
      .catch(error => {
        // console.log('error caught: ' + error.message)
        done(error.message)
      })
  })
  it('renders user show with logEntries correctly', (done) => {
    const ids = user.logBook.map(l => l.id)
    ids.push(randId)
    ids.push(userID)
    request(app)
      .get(`/users/${userID}`)
      .then((response) => {
        expect(removeIDs(response.text, ids)).toMatchSnapshot()
        done()
      })
  })
})
