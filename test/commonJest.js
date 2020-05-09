process.env.NODE_ENV = 'test'
const Course = require('../models/course')
const request = require('supertest')
module.exports = {
  app: require('../app'),
  Course: Course,
  request: request
}

const mongoose = require('mongoose')
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

afterAll(async () => {
  console.log(typeof (db))
  await db.close()
})

beforeEach(function (done) {
  // console.log('global beforeEach')
  Course.deleteMany({})
    .then(() => {
      // console.log('all courses deleted')
      done()
    })
    .catch(error => {
      // console.log('error caught: ' + error.message)
      done(error.message)
    })
})
