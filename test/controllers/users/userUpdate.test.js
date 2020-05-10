const { app, User, request } = require('../../commonJest')

const userData = {
  name: { first: 'Mieke', last: 'Bauschinger' },
  email: 'lio.buschbaum@gmail.com',
  zipCode: 72438,
  password: 'geheim234'
}
describe('user update', () => {
  let userId
  beforeEach(done => {
    User.create(userData).then(u => { userId = u.id; done() }).catch(e => done(e))
  })

  it('changes data', function (done) {
    const newName = 'Maike'
    request(app)
      .put(`/users/${userId}/update`)
      .send({ first: newName })
      .expect(302)
      .then((res) => {
        User.findById(userId)
          .exec()
          .then(u => {
            expect(u.name.first).toBe(newName)
            done()
          })
          .catch(e => done(e))
      })
  })
})
