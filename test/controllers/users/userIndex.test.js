const { app, User, request } = require('../../commonJest')

describe('user index', () => {
  it('returns ok', done => {
    request(app)
      .get('/users')
      .expect(200, done)
  })
  it('returns ok, variant 2', done => {
    request(app)
      .get('/users')
      .expect(200)
      .end(function (err, res) {
        if (err) done(err)
        done()
      })
  })
  describe('with users in db', () => {
    const userData = require('../../../mongo/seed/users')

    beforeEach(done => {
      User.create(userData)
        .then(created => {
          done()
        })
        .catch(error => {
          done(error.message)
        })
    })
    // see https://github.com/visionmedia/superagent
    it('lists all users', function (done) {
      request(app)
        .get('/users')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          const body = res.text
          for (const user of userData) {
            expect(body).toContain(user.name.first)
            expect(body).toContain(user.name.last)
          }
          done()
        })
    })
  })
})
