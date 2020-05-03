
const chai = require('chai')
const { expect } = chai

const coursesController = require('../controllers/coursesController')

describe('coursesController', function () {
  describe('getCourseParams', function () {
    it('should extract course parameters from request body ', function () {
      const expected = {
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
      const body = { ...{ a: 'b', c: 'd', ...expected } } // in this simple example without nesting, its mostly the same.
      expect(coursesController.getCourseParams(body)).to.deep.equal(expected)
    })
    it('should return an empty object with empty request', function () {
      const emptyBody = {}
      expect(coursesController.getCourseParams(emptyBody)).to.deep.equal({})
    })
  })
})
