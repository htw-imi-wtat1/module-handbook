process.env.NODE_ENV = 'test'
const Course = require('../models/course')
module.exports = {
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
