const { app, User, request } = require('../../commonJest')

describe('user delete', () => {
  let userID
  beforeEach(done => {
    User.create({
      name: { first: 'Mieke', last: 'Bauschinger' },
      email: 'lio.buschbaum@gmail.com',
      zipCode: 72438,
      password: 'geheim234'
    }).then(u => { userID = u.id; done() }).catch(e => done(e))
  })

  it('deletes user', done => {
    User.countDocuments({}).then(countBefore => {
      request(app)
        .delete(`/users/${userID}/delete`)
        .expect(302)
        .then((res) => {
          User.countDocuments({}).then(countAfter => {
            expect(countAfter).toBe(countBefore - 1)
            done()
          })
        })
    })
  })
})
