// copied from https://github.com/visionmedia/supertest
const request = require('supertest')
const express = require('express')

describe('request.agent(app)', function () {
  const app = express()
  app.use((req, res, next) => {
    req.user = 'my user'
    res.locals.helloOne = 'hello'
    next()
  })
  app.get('/', function (req, res) {
    res.cookie('cookie', 'hey')
    res.user = req.user
    res.locals.hello = 'hello'
    res.send('The user is: ' + req.user)
  })

  app.get('/reslocal', function (req, res) {
    res.send('res.locals.helloOne: ' + res.locals.helloOne)
  })

  const agent = request.agent(app)

  it('Values on the request within express', function (done) {
    agent
      .get('/')
      .expect('The user is: my user', done)
  })
  it('Values on the response within express', function (done) {
    agent
      .get('/reslocal')
      .expect('res.locals.helloOne: hello', done)
  })
  it('Values on the response are not saved in superagent', function (done) {
    agent
      .get('/')
      .then((response) => {
        expect(response.user).toBe(undefined)
        expect(response.locals).toBe(undefined)
        done()
      })
  })
})
