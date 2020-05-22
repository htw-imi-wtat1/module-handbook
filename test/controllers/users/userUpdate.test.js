const { app, User, request, id } = require('../../commonJest')

describe('user update', () => {
  it('changes data', async function (done) {
    const userData = {
      name: {
        first: 'Cecile',
        last: 'Kreutz'
      },
      email: `summer88__${id()}__@yahoo.com`,
      zipCode: 35525,
      password: 'geheim234'
    }
    const user = await User.create(userData)
    const userID = user.id
    const newName = 'Maike'
    request(app)
      .put(`/users/${userID}`)
      .send({ first: newName })
      .expect(303)
      .then((res) => {
        User.findById(userID)
          .exec()
          .catch(e => done(e))
          .then(u => {
            expect(u.name.first).toBe(newName)
            done()
          })
      })
  })
})
