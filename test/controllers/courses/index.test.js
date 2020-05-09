const { app, Course, request } = require('../../commonJest')

const courseData = require('../../../mongo/seed/imi-b-courses')
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
      request(app)
        .get('/courses')
        .then((res) => {
          expect(res.statusCode).toBe(200)
          done()
        })
    })
    it('show all courses in db', function (done) {
      request(app)
        .get('/courses')
        .then((res) => {
          const body = res.text
          for (const course of threeCourses) {
            expect(body).toContain(course.code)
            expect(body).toContain(course.name)
          }
          done()
        })
    })
  })
})
