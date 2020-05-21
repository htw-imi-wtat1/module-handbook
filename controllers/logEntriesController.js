'use strict'

const User = require('../models/user')
const Course = require('../models/course')
const logEntrySchema = require('../models/logEntry')

const getLogEntryParams = body => {
  return {
    semester: body.semester,
    event: body.event,
    notes: body.notes,
    course: body.course,
    date: body.date
  }
}

module.exports = {

  new: (req, res) => {
    const userId = req.params.id
    res.locals.userId = userId
    User.findById(userId)
      .then(user => {
        res.locals.user = user
        return Course.find({}).sort({ code: 1 }).select('code name').exec()
      })
      .then(courses => {
        res.locals.courses = courses.map(c => { return { code: c.code, fullName: c.fullName } })
        res.locals.eventValues = logEntrySchema.path('event').enumValues
        res.render('logEntries/new')
      })
  },
  create: (req, res, next) => {
    const params = getLogEntryParams(req.body)
    const userId = req.body.userId
    User.findById(userId)
      .then(user => {
        user.logBook.push(params)
        return user.save()
      })
      .then(user => {
        res.locals.redirect = `/users/${userId}`
        res.locals.user = user
        next()
      })
      .catch(error => {
        console.log(`Error adding logEntry to user: ${error.message}`)
        next(error)
      })
  },
  edit: (req, res, next) => {
  },
  update: (req, res, next) => {},
  delete: (req, res, next) => {
  },
  redirectView: (req, res, next) => {
    const redirectPath = res.locals.redirect
    if (redirectPath !== undefined) res.redirect(redirectPath)
    else next()
  }
}
