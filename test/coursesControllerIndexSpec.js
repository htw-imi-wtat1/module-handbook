const { chai, expect, app, Course } = require('./common')

const courseData = require('../mongo/seed/imi-b-courses')
const threeCourses = [courseData[3], courseData[15], courseData[23]]

describe('coursesController', function () {
  beforeEach(function (done) {
    Course.create(threeCourses)
    // to see tests fail, use this:
    // return Course.create([{code: "dummy"}])
      .then(createdCourses => {
        // console.log(createdCourses.length + ' courses created')
        done()
      })
      .catch(error => {
        console.log('error caught: ' + error.message)
        done(error.message)
      })
  })
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
