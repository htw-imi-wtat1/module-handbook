const { app, request, Course, removeID } = require('../../commonJest')

const courseData = {
  semester: 3,
  required: 'required',
  code: 'B13_index_snapshot',
  name: 'Bildverarbeitung',
  mission: 'work on pictures',
  ects: 2,
  examination: 'exam',
  objectives: 'learn to transform pictures',
  contents: 'loops over pixels',
  prerequisites: 'info2',
  literature: 'some books',
  methods: 'P SL/Ü',
  skills_knowledge_understanding: 'a',
  skills_intellectual: 'b',
  skills_practical: 'c',
  skills_general: 'd'
}

describe('Course Show', function () {
  let courseID
  beforeEach(function (done) {
    Course.create(courseData)
      .then(created => {
        courseID = created.id
        done()
      })
      .catch(error => {
        // console.log('error caught: ' + error.message)
        done(error.message)
      })
  })
  it('renders course show correctly', (done) => {
    request(app)
      .get(`/courses/${courseID}`)
      .then((response) => {
        expect(removeID(response.text, courseID)).toMatchSnapshot()
        done()
      })
  })
})
