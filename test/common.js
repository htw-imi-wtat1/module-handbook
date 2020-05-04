process.env.NODE_ENV = 'test'
const chai = require('chai')
chai.use(require('chai-http'))
const Course = require('../models/course')
module.exports = {
  chai: chai,
  expect: chai.expect,
  app: require('../app'),
  Course: Course
}
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
