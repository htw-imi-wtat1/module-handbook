const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/modulehandbook_db'
const mongoose = require('mongoose')
const Course = require('../../app/models/course')
const User = require('../../app/models/user')
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

const courseData = require('./imi-b-courses')

function openCourseOverview () {
  if (/localhost/.test(mongoURI)) {
    const open = require('open')
    open('http://localhost:3002/courses')
  }
}

const userData = []
const faker = require('faker')
faker.locale = 'de'

for (let i = 0; i < 20; i = i + 1) {
  userData.push(
    {
      name: {
        first: faker.name.firstName(),
        last: faker.name.lastName()
      },
      email: faker.internet.email(),
      zipCode: faker.address.zipCode('#####'),
      password: faker.internet.password()
      // password: 'geheim12'
    })
}
console.log('userData ' + userData.length)
User.deleteMany({})
  .then(() => {
    console.log('all users deleted')
    return User.create(userData)
  })
  .then(created => {
    console.log(created.length + ' users created')
    return Course.deleteMany({})
  }).then(() => {
    console.log('all courses deleted')
    return Course.create(courseData)
  })

  .then(createdCourses => {
    console.log(createdCourses.length + ' courses created')
    mongoose.connection.close()
    openCourseOverview()
  })
  .catch(error => {
    console.log(error.message)
    mongoose.connection.close()
  })
