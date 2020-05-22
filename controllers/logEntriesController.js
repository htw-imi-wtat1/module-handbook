'use strict'

const User = require('../models/user')
const Course = require('../models/course')
const { logEntrySchema } = require('../models/logEntry')

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
    const userId = req.params.id
    User.findById(userId)
      .then(user => {
        res.locals.user = user
        return Course.find({}).sort({ code: 1 }).select('code name').exec()
      })
      .then(courses => {
        res.locals.courses = courses.map(c => { return { code: c.code, fullName: c.fullName } })
        res.locals.eventValues = logEntrySchema.path('event').enumValues
        res.render('logEntries/edit')
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`)
        next(error)
      })
  },

  update: (req, res, next) => {
    const userId = req.params.id
    const logEntryId = req.params.logEntryId
    const params = getLogEntryParams(req.body)

    User.updateOne({ _id: userId, 'logBook._id': logEntryId },
      { $set: { 'logBook.$': params } })
      .then(user => {
        console.log(user)
        res.locals.redirect = `/users/${userId}`
        res.locals.user = user
        next()
      })
      .catch(error => {
        console.log(`Error updating user by ID: ${error.message}`)
        next(error)
      })
    next()
  },

  delete: (req, res, next) => {
    const userId = req.params.id
    const logEntryId = req.params.logEntryId
    User.findById(userId)
      .then(user => {
        user.logBook.id(logEntryId).remove()
        user.save()
        res.locals.redirect = `/users/${userId}`
        next()
      })
      .catch(error => {
        console.log(`Error removing logEntry by ID: ${error.message}`)
        next()
      })
  },
  redirectView: (req, res, next) => {
    const redirectPath = res.locals.redirect
    if (redirectPath !== undefined) res.redirect(303, redirectPath)
    else next()
  }
}
