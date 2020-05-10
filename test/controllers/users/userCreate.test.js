const { app, User, request } = require('../../commonJest')

let count = 101
function generateDataFlat () {
  return {
    first: 'Mieke',
    last: 'Bauschinger',
    email: `mieke.buschbaum${count++}@gmail.com`,
    zipCode: 72438,
    password: 'geheim234'
  }
}
const incompleteData = {
  first: 'Maurice'
}
describe('user create', function () {
  it('post /users/create is 302', function (done) {
    done()
    request(app).post('/users/create').send(generateDataFlat()).expect(302).end(done)
  })
  it('post /users/create with incomplete data', function (done) {
    done()
    request(app).post('/users/create').send(incompleteData).expect(500, done)
  })
  it('post /users/create adds a user', function (done) {
    User.countDocuments({}).then(countBefore => {
      request(app)
        .post('/users/create')
        .send(generateDataFlat())
        .expect(302)
        .then((res) => {
          User.countDocuments({}).then(countAfter => {
            expect(countAfter).toBe(countBefore + 1)
            done()
          })
        })
    })
  })
  it('does not store an incomplete user', function (done) {
    User.countDocuments({}).then(countBefore => {
      request(app)
        .post('/users/create')
        .send(incompleteData)
        .expect(500) // 500 is not the best response here, but this will be changed later on.
        .then((res) => {
          User.countDocuments({}).then(countAfter => {
            expect(countAfter).toBe(countBefore)
            done()
          })
        })
    })
  })

  it('C5 post /users/create stores data', function (done) {
    User.countDocuments({}).then(countBefore => {
      const userDataFlat = generateDataFlat()
      request(app)
        .post('/users/create')
        .send(userDataFlat)
        .expect(302)
        .then((res) => {
          User.countDocuments({}).then(countAfter => {
            expect(countAfter).toBe(countBefore + 1)
            User.findOne({ email: userDataFlat.email })
              .exec()
              .then(u => {
                expect(u.email).toBe(userDataFlat.email)
                expect(u.zipCode).toBe(userDataFlat.zipCode)
                expect(u.password).toBe(userDataFlat.password)
                expect(u.name.first).toBe(userDataFlat.first)
                expect(u.name.last).toBe(userDataFlat.last)
                console.log(JSON.stringify(u))
                done()
              })
          })
        })
    })
  })
})
