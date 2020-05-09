const { app, User, request, id } = require('../../commonJest')

describe('user index', () => {
  const userData = [
    {
      name: {
        first: 'Ilayda',
        last: 'Kulma'
      },
      email: `ilayda_hirsch81_${id()}@gmail.com`,
      zipCode: 36953,
      password: 'geheim123'
    },
    {
      name: {
        first: 'Cecile',
        last: 'Kreutz'
      },
      email: `summer88_${id()}@yahoo.com`,
      zipCode: 35525,
      password: 'geheim234'
    },
    {
      name: {
        first: 'Dorian',
        last: 'Borgschulze'
      },
      email: `dorian_borgschulze_${id()}@gmail.com`,
      zipCode: 57138,
      password: 'geheim345'
    }]
  beforeAll(done => {
    User.create(userData)
      .then(created => {
        done()
      })
      .catch(error => {
        done(error.message)
      })
  })
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

  // see https://github.com/visionmedia/superagent
  it('lists all users', async function (done) {
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
