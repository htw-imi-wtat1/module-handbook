const { Course, app, request, id } = require('../../commonJest')

let courseData
describe('coursesController', function () {
  beforeEach(() => {
    courseData = {
      code: `Test_Course_${id()}`,
      name: '2. Fremdsprache',
      mission: 'learn language',
      ects: 4,
      examination: 'Exam',
      objectives: 'learn language',
      contents: 'verbs, nouns and adjectives',
      prerequisites: 'basic course in same language',
      literature: 'text book',
      methods: 'WP Ü',
      skills_knowledge_understanding: 'skills 1',
      skills_intellectual: 'skills 2',
      skills_practical: 'skills 3',
      skills_general: 'skills 4'
    }
  })
  it('direct save', function (done) {
    const testCourse = new Course(courseData)
    testCourse.save()
      .then(() => {
        Course.find({ code: courseData.code })
          .then(result => {
            expect(result.length).toBe(1)
            expect(result[0]).toHaveProperty('_id')
            done()
          })
      })
      .catch((error) => {
        done(error.message)
      })
  })
  it('create via post', function (done) {
    request(app)
      .post('/courses')
      .send(courseData)
      .expect(201)
      .then(res => {
        Course.find({ code: courseData.code })
          .then(result => {
            expect(result.length).toBe(1)
            expect(result[0]).toHaveProperty('_id')
            done()
          })
      })
      .catch((error) => {
        done(error.message)
      })
  })
})
