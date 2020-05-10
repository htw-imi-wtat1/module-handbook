process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('../app')

// https://github.com/visionmedia/supertest/issues/189
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

module.exports = {
  app: app,
  request: request,
  supertest: request
}

const mongoose = require('mongoose')
// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
// const db = mongoose.connection

const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoServer = new MongoMemoryServer()

console.log('connecting to db')
mongoServer.getUri().then((mongoUri) => {
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  mongoose.connect(mongoUri, mongooseOpts)
  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e)
      mongoose.connect(mongoUri, mongooseOpts)
    }
    console.log(e)
    //  })

    mongoose.connection.once('open', () => {
      console.log(`MongoDB successfully connected to ${mongoUri}`)
    })
  })
})
afterAll(async (done) => {
  await mongoose.connection.close()
  done()
})

const User = require('../models/user')
const Course = require('../models/course')
module.exports.User = User
module.exports.Course = Course

beforeEach(async (done) => {
  await mongoose.connection.collection('Course').deleteMany({})
  await mongoose.connection.collection('User').deleteMany({})
  User.countDocuments({}).then(count => { console.log('User count ' + count) })
  Course.countDocuments({}).then(count => { console.log('Course count ' + count) })
  console.log('cleaned db')
  done()
})
