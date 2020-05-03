process.env.NODE_ENV = 'test'
const chai = require('chai')
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const { expect } = chai
const app = require('../app')
const Course = require('../models/course')
const testCourseData = {
  code: 'B16',
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
beforeEach(function (done) {
  Course.deleteMany({})
    .then(() => {
      done()
    })
})
describe('coursesController', function () {
  describe('course list', function () {
    it('show all courses in db', function (done) {
      chai.request(app)
        .get('/courses')
        .end((errors, res) => {
          expect(res).to.have.status(200)
          expect(errors).to.be.equal(null)
          done()
        })
    })
  })
})
