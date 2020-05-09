const { app, User, request } = require('../../commonJest')
const userData = require('../../../mongo/seed/users')
const ObjectID = require('mongodb').ObjectID
function to12 (s) {
  if (s.length > 12) {
    return s.substr(0, 12)
  }
  return s + '_'.repeat(12 - s.length)
}
describe('User Index', function () {
  beforeEach(function (done) {
    const dataFixedIDs = userData.map(u => {
      u._id = new ObjectID(to12(u.email))
      return u
    })

    User.create(dataFixedIDs)
    // to see tests fail, use this:
    // return Course.create([{ code: 'dummy' }])
      .then(createdCourses => {
        // console.log(createdCourses.length + ' courses created')
        done()
      })
      .catch(error => {
        console.log('error caught: ' + error.message)
        done(error.message)
      })
  })
  it('renders user index correctly', (done) => {
    request(app)
      .get('/users')
      .then((response) => {
        expect(response.text).toMatchSnapshot()
        done()
      })
  })
})
