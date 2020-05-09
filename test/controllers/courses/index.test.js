const { app, Course, request } = require('../../commonJest')

describe('coursesController', function () {
  let threeCourses
  beforeEach(async () => {
    threeCourses = await Promise.all([
      Course.create({ code: 'Index_B1', name: 'Informatik 1' }),
      Course.create({ code: 'Index_B7', name: 'Informatik 2' }),
      Course.create({ code: 'Index_B15', name: 'Informatik 3' })])
  })
  describe('course list', function () {
    it('show ok on /courses', function (done) {
      request(app)
        .get('/courses')
        .expect(200, done)
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
