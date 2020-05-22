const { app, User, request, id } = require('../../commonJest')
let userData
let uniqueFirstName
beforeEach(() => {
  uniqueFirstName = `ILAYDA_${id()}`
  userData = {
    first: uniqueFirstName,
    last: 'Kulma',
    email: `ilayda_hirsch_${id()}@gmail.com`,
    zipCode: 36953,
    password: 'geheim12'
  }
})
describe('sanitizer', function () {
  it('sets email to lowercase', (done) => {
    userData.email = `ILAYDA_${id()}@SERVER.de`
    request(app)
      .post('/users')
      .send(userData)
      .expect(303)
      .then((res) => {
        User.findOne({ 'name.first': uniqueFirstName })
          .then(insertedRecord => {
            expect(insertedRecord).not.toBeNull()
            expect(insertedRecord.email).toMatch(/ilayda_/)
            done()
          })
      }).catch(e => done(e))
  })
})
