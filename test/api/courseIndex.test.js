const { app, Course, request } = require('../commonJest')

describe('API: course list', async function () {
  let threeCourses
  beforeAll(async () => {
    threeCourses = await Promise.all([
      Course.create({ code: 'Index_B1', name: 'Informatik 1' }),
      Course.create({ code: 'Index_B7', name: 'Informatik 2' }),
      Course.create({ code: 'Index_B15', name: 'Informatik 3' })])
  })
  it('show ok on /courses', function (done) {
    request(app)
      .get('/api/courses')
      .expect(200, done)
  })
  it('show all courses in db', function (done) {
    request(app)
      .get('/api/courses')
      .then((response) => {
        const body = response.text
        for (const course of threeCourses) {
          expect(body).toContain(course.code)
          expect(body).toContain(course.name)
        }
        done()
      })
  })
  it('explore json', async function (done) {
    const courses = await Course.find({})
    const numberOfCourses = courses.length
    request(app)
      .get('/api/courses')
      .then((response) => {
        expect(response.body.data.courses.length).toBe(numberOfCourses)
        done()
      })
  })
})
