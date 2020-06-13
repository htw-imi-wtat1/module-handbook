'use strict'

const httpStatus = require('http-status-codes')
const Course = require('../models/course')
// const fields = Object.keys(Course.schema.paths);
const fields = ['code', 'name', 'semester', 'ects', 'mission', 'examination', 'objectives', 'contents', 'prerequisites', 'literature', 'methods', 'skills_knowledge_understanding', 'skills_intellectual', 'skills_practical', 'skills_general']

// console.log(fields);

exports.index = (req, res, next) => {
  Course.find({})
    .sort('code')
    .exec()
    .then((courses) => {
      res.render('courses/index', { courses: courses })
    }).catch((error) => {
      console.log(error.message)
      return []
      // }).then(() => {
      //   console.log("promise complete");
    })
}
exports.show = (req, res, next) => {
  // console.log(req.params);
  const courseId = req.params.id
  // const code = 'B2';
  Course.findById(courseId, (error, course) => {
    if (error) next(error)
    // res.send(fields);
    res.render('courses/show', { course: course, notice: '', fields: fields })
  })
}
exports.new = (req, res, next) => {
  res.render('courses/new', { fields: fields })
}

function getCourseParams (body) {
  const o = {}
  fields.forEach(f => {
    if (body[f]) {
      o[f] = body[f]
    }
  })
  return o
}

module.exports.getCourseParams = getCourseParams

exports.create = (req, res, next) => {
  const newCourse = new Course(getCourseParams(req.body))
  newCourse.save()
    .then(result => {
      res.status(httpStatus.CREATED)
      res.render('courses/show', { notice: 'Course created', course: newCourse, fields: fields })
    })
    .catch(error => {
      if (error) res.send(error)
    })
}
