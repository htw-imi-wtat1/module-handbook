// this is a test that actually tests the api of mongoose -
// it's a way to explore the api and by keeping a test like this
// in the codebase, this test will break if the behaviour of the api
// changes (this idea was introduced by Michael C. Feathers)

const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID

describe('[mongoose] ', () => {
  beforeAll(async () => {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  describe('id in tests:', () => {
    const bookSchema = mongoose.Schema({
      title: String,
      author: String
    })
    const bookParams = {
      title: 'Eloquent JavaScript, 3rd Edition: A Modern Introduction to Programming',
      author: 'Marijn Haverbeke '
    }
    const Book = mongoose.model('Book', bookSchema)

    it('automatically set id changes', function (done) {
      Book.create(bookParams).then((book) => {
        expect(typeof (book._id)).toBe('object')
        expect(typeof (book.id)).toBe('string')
        // this is different with every run:
        // expect(book.id).toBe('5eb6938e9582a794ae6cc37e')
        done()
      })
    })
    it('set id to generated one stays the same', function (done) {
      bookParams._id = new ObjectID('313233313233313233313233')
      Book.create(bookParams).then((book) => {
        expect(book.id).toBe('313233313233313233313233')
        done()
      })
    })
    it('set id with code like in module', function (done) {
      const c = { code: 'B15' }
      bookParams._id = new ObjectID(c.code + '_'.repeat(12 - c.code.length))
      Book.create(bookParams).then((book) => {
        expect(typeof (book._id)).toBe('object')
        expect(typeof (book._id._bsontype)).toBe('string')
        expect(book.id).toBe('4231355f5f5f5f5f5f5f5f5f')
        done()
      })
    })
  })
})
