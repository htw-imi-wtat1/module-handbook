process.env.NODE_ENV = 'test'
const request = require('supertest')
module.exports = {
  app: require('../app'),
  request: request
}

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

afterAll(async () => {
  await db.close()
})

const User = require('../models/user')
const Course = require('../models/course')
module.exports.User = User
module.exports.Course = Course
beforeEach(function (done) {
  // console.log('global beforeEach')
  Course.deleteMany({})
    .then(() => {
      User.deleteMany({})
    })
    .then(() => {
      done()
    })
    .catch(error => {
      // console.log('error caught: ' + error.message)
      done(error.message)
    })
})
