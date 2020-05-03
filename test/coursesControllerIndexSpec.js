process.env.NODE_ENV = 'test'
const chai = require('chai')
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const { expect } = chai
const app = require('../app')
const Course = require('../models/course')
const courseData = require('../mongo/seed/imi-b-courses')
const threeCourses = [courseData[3], courseData[15], courseData[23]]

beforeEach(function (done) {
  Course.deleteMany({})
    .then(() => {
      console.log('all courses deleted')
    })
    .then(() => {
      return Course.create(threeCourses)
      // to see tests fail, use this:
      // return Course.create([{code: "dummy"}])
    })
    .catch(error => done(error.message))
    .then(createdCourses => {
      console.log(createdCourses.length + ' courses created')
      done()
    })
})
describe('coursesController', function () {
  describe('course list', function () {
    it('show ok on /courses', function (done) {
      chai.request(app)
        .get('/courses')
        .end((errors, res) => {
          expect(res).to.have.status(200)
          expect(errors).to.be.equal(null)
          done()
        })
    })
    it('show all courses in db', function (done) {
      chai.request(app)
        .get('/courses')
        .end((errors, res) => {
          const body = res.text
          for (const course of threeCourses) {
            expect(body).to.include(course.code)
            expect(body).to.include(course.name)
          }
          done()
        })
    })
  })
})
