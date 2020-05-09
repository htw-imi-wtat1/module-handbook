const { app, User, request, removeID } = require('../../commonJest')

describe('User Index', function () {
  const userData = {
    name: { first: 'Jamila', last: 'Marl' },
    email: 'laurenz.schwandke69_@yahoo.com',
    zipCode: 94577,
    password: 'Ffit82AW5EvioKC'
  }
  let userID // this is shared state between all tests!
  beforeAll(function (done) {
    User.create(userData)
      .then(created => {
        userID = created.id
        done()
      })
      .catch(error => {
        console.log('error caught: ' + error.message)
        done(error.message)
      })
  })
  it('renders user index correctly', (done) => {
    request(app)
      .get(`/users/${userID}`)
      .then((response) => {
        expect(removeID(response.text, userID)).toMatchSnapshot()
        done()
      })
  })
})
