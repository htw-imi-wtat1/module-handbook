const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/modulehandbook_db'
const mongoose = require('mongoose')
const Course = require('../../models/course')
mongoose.Promise = global.Promise
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

const courseData = require('./imi-b-courses')

function openCourseOverview () {
  if (/localhost/.test(mongoURI)) {
    const open = require('open')
    open('http://localhost:3002/courses')
  }
}

Course.deleteMany({})
  .then(() => {
    console.log('all courses deleted')
  })
  .then(() => {
    return Course.create(courseData)
  })
  .catch(error => console.log(error.message))
  .then(createdCourses => {
    console.log(createdCourses.length + ' courses created')
    mongoose.connection.close()
    openCourseOverview()
  })
