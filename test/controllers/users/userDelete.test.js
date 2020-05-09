const { app, User, request, id } = require('../../commonJest')

describe('user delete', () => {
  async function createUser () {
    const userData = {
      name: { first: 'Mieke', last: 'Bauschinger' },
      email: `lio.buschbaum_${id()}@gmail.com`,
      zipCode: 72438,
      password: 'geheim234'
    }
    const user = await User.create(userData)
    return user
  }

  it('deletes user', async done => {
    const user = await createUser()
    request(app)
      .delete(`/users/${user.id}/delete`)
      .expect(302)
      .then((res) => {
        User.findOne({ email: user.email }).then(u => {
          expect(u).toBeNull()
          done()
        }).catch(e => done(e))
      })
  })
})
