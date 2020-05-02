'use strict'

const Course = require('../models/course')
// const fields = Object.keys(Course.schema.paths);
const fields = ['code', 'name', 'ects', 'mission', 'examination', 'objectives', 'contents', 'prerequisites', 'literature', 'methods', 'skills_knowledge_understanding', 'skills_intellectual', 'skills_practical', 'skills_general']

// console.log(fields);

exports.getAllCourses = (req, res, next) => {
  Course.find({})
    .exec()
    .then((courses) => {
      res.render('courses', { courses: courses })
    }).catch((error) => {
      console.log(error.message)
      return []
    // }).then(() => {
      //   console.log("promise complete");
    })
}
exports.getCourse = (req, res, next) => {
  // console.log(req.params);
  const courseId = req.params.id
  // const code = 'B2';
  Course.findById(courseId, (error, course) => {
    if (error) next(error)
    // res.send(fields);
    res.render('course', { course: course, notice: '', fields: fields })
  })
}
exports.createCourse = (req, res, next) => {
  res.render('createCourse', { fields: fields })
}

exports.saveCourse = (req, res, next) => {
  const o = {}
  fields.forEach(f => {
    o[f] = req.body[f]
  })
  const newCourse = new Course(o)
  newCourse.save()
    .then(result => {
      res.render('course', { notice: 'Course created', course: newCourse, fields: fields })
    })
    .catch(error => {
      if (error) res.send(error)
    })
}
