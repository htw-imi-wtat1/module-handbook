'use strict'

const { app, request } = require('../../commonJest')
describe('course new', () => {
  it('shows the new view', done => {
    request(app)
      .get('/courses/new')
      .expect(200, done)
  })
})
