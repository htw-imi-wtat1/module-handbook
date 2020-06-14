// based on https://github.com/visionmedia/supertest
const request = require('supertest')
// const { request, id } = require('../../commonJest')

const express = require('express')
const cookieParser = require('cookie-parser')

describe('request.agent(app)', function () {
  const app = express()
  app.use(cookieParser())

  app.request.getAuthenticatedUser = function () {
    return this.user
  }
  // some middleware - e.g. passport - sets the authenticated user
  app.use((req, res, next) => {
    req.user = 'the authenticated user'
    next()
  })
  app.get('/', function (req, res) {
    res.send(req.getAuthenticatedUser())
  })

  it('should send the authenticated user', function (done) {
    request(app)
      .get('/')
      .expect('the authenticated user', done)
  })
  it('can easily be overwritten by tests', (done) => {
    app.request.getAuthenticatedUser = function () {
      return 'some dummy test user'
    }
    request(app)
      .get('/')
      .expect('some dummy test user', done)
  })
  it('still send the same overwritten user - same app object', function (done) {
    request(app)
      .get('/')
      .expect('some dummy test user', done)
  })
})
