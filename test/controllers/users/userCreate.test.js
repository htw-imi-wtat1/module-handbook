const { app, User, request, id } = require('../../commonJest')

describe('user create', function () {
  let userData
  beforeEach(() => {
    userData = {
      first: 'Ilayda',
      last: 'Kulma',
      //  email: 'ilayda_hirsch@ymail.com',
      email: `ilayda_hirsch_${id()}@gmail.com`,
      zipCode: 36953,
      password: 'geheim123'
    }
  })

  it('post /users/create is 302', function (done) {
    request(app).post('/users/create').send(userData).expect(302).end(done)
  })

  it('post /users/create adds a user', async function (done) {
    request(app)
      .post('/users/create')
      .send(userData)
      .expect(302)
      .then((res) => {
        console.log(userData.email)
        User.findOne({ email: userData.email }).then(insertedRecord => {
          expect(insertedRecord).not.toBeNull()
          expect(userData).not.toBeNull()
          expect(insertedRecord.name.first).toBe(userData.first)
          done()
        })
      }).catch(e => done(e))
  })
  describe('with incomplete data', () => {
    function incompleteData () { return { first: 'Maurice', email: `incomplete_${id()}@ymail.com` } }

    it('post /users/create with incomplete data', function (done) {
      request(app).post('/users/create').send(incompleteData()).expect(500, done)
    })

    it('does not store an incomplete user', function (done) {
      const data = incompleteData()
      request(app)
        .post('/users/create')
        .send(data)
        .expect(500) // 500 is not the best response here, but this will be changed later on.
        .then((res) => {
          User.findOne({ email: data.email }).then(created => {
            expect(created).toBeNull()
            done()
          }).catch(e => done(e))
        })
    })
  })

  it('post /users/create stores data - full data check', function (done) {
    const userDataFlat = {
      first: 'Cecile',
      last: 'Kreutz',
      email: `summer88_${id()}@gmail.com`,
      zipCode: 87459,
      password: 'geheim123'
    }

    request(app)
      .post('/users/create')
      .send(userDataFlat)
      .expect(302)
      .then((res) => {
        User.findOne({ email: userDataFlat.email })
          .exec()
          .then(u => {
            expect(u.email).toBe(userDataFlat.email)
            expect(u.zipCode).toBe(userDataFlat.zipCode)
            expect(u.password).toBe(userDataFlat.password)
            expect(u.name.first).toBe(userDataFlat.first)
            expect(u.name.last).toBe(userDataFlat.last)
            done()
          })
      })
  })
  it('send with nested attributes does also work', function (done) {
    const userData2 = {
      name: {
        first: 'Cecile',
        last: 'Kreutz'
      },
      email: `summer88_${id()}@gmail.com`,
      zipCode: 87459,
      password: 'geheim123'
    }

    request(app)
      .post('/users/create')
      .send(userData2)
      .expect(302)
      .then((res) => {
        User.findOne({ email: userData2.email })
          .exec()
          .then(u => {
            expect(u.email).toBe(userData2.email)
            expect(u.zipCode).toBe(userData2.zipCode)
            expect(u.password).toBe(userData2.password)
            expect(u.name.first).toBe(userData2.name.first)
            expect(u.name.last).toBe(userData2.name.last)
            done()
          })
      })
  })
})
