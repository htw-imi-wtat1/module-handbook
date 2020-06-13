const MONGO_URL_USE_TEST = 'mongodb://localhost:27017/modulehandbook_test_db'
const mongodbURI = MONGO_URL_USE_TEST
const mongoose = require('mongoose')
mongoose.connect(mongodbURI,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log('connected to mongoose: ' + mongodbURI))
  .catch(error => console.log('error creating connection to: ' + mongodbURI + error))

const User = require('../app/models/user')
const Course = require('../app/models/course')

async function cleanDB () {
  await User.deleteMany({})
  console.log('all Users Deleted')
  await Course.deleteMany({})
  console.log('all Courses Deleted')
}
cleanDB().then(() => { console.log('done.') })
console.log('main script ended')
