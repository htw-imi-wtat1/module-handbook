const { app, Course, request } = require('../../commonJest')

const courseData = require('../../../mongo/seed/imi-b-courses')
const threeCourses = [courseData[3], courseData[15], courseData[23]]
const ObjectID = require('mongodb').ObjectID

describe('Courses Index', function () {
  beforeEach(function (done) {
    const dataFixedIDs = threeCourses.map(c => {
      c._id = new ObjectID(c.code + '_'.repeat(12 - c.code.length))
      return c
    })

    Course.create(dataFixedIDs)
    // to see tests fail, use this:
    // return Course.create([{ code: 'dummy' }])
      .then(createdCourses => {
        // console.log(createdCourses.length + ' courses created')
        done()
      })
      .catch(error => {
        console.log('error caught: ' + error.message)
        done(error.message)
      })
  })
  it('renders course index correctly', (done) => {
    request(app)
      .get('/courses')
      .then((response) => {
        expect(response.text).toMatchSnapshot()
        done()
      })
  })
})
