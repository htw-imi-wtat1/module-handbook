'use strict'

const httpStatus = require('http-status-codes')
const User = require('../models/user')
const Course = require('../models/course')
const { logEntrySchema, LogEntry } = require('../models/logEntry')
const { dateFormFormat } = require('../helper/date')

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
        res.locals.logEntry = new LogEntry({ date: new Date() })
        return Course.find({}).sort({ code: 1 }).select('code name').exec()
      })
      .then(courses => {
        res.locals.courses = courses.map(c => { return { code: c.code, fullName: c.fullName } })
        res.locals.eventValues = logEntrySchema.path('event').enumValues
        res.locals.dateFormFormat = dateFormFormat
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
        res.status(httpStatus.CREATED)
        req.flash('success', 'LogBook Entry created successfully!')
        res.locals.redirect = `/users/${userId}`
        res.locals.user = user
        next()
      })
      .catch(error => {
        req.flash('warning', `Error adding logEntry to user: ${error.message}`)
        next(error)
      })
  },
  edit: (req, res, next) => {
    const userId = req.params.id
    const logEntryId = req.params.logEntryId
    User.findById(userId)
      .then(user => {
        res.locals.user = user
        res.locals.logEntry = user.logBook.id(logEntryId)
        return Course.find({}).sort({ code: 1 }).select('code name').exec()
      })
      .then(courses => {
        res.locals.courses = courses.map(c => { return { code: c.code, fullName: c.fullName } })
        res.locals.eventValues = logEntrySchema.path('event').enumValues
        res.locals.dateFormFormat = dateFormFormat
        res.render('logEntries/edit')
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`)
        req.flash('warning', `Error fetching user by ID: ${error.message}`)
        next(error)
      })
  },

  update: (req, res, next) => {
    const userId = req.params.id
    const logEntryId = req.params.logEntryId
    const params = getLogEntryParams(req.body)

    User.findById(userId)
      .then(user => {
        const logEntry = user.logBook.id(logEntryId)
        logEntry.set(params)
        return user.save()
      })
      .then(user => {
        res.locals.redirect = `/users/${userId}`
        res.locals.user = user
        req.flash('success', 'LogBook Entry updated successfully!')
        next()
      })
      .catch(error => {
        req.flash('warning', `Error updating user by ID: ${error.message}`)
        next(error)
      })
  },

  delete: (req, res, next) => {
    const userId = req.params.id
    const logEntryId = req.params.logEntryId
    User.findById(userId)
      .then(user => {
        user.logBook.id(logEntryId).remove()
        user.save()
        req.flash('success', 'LogBook Entry deleted successfully!')
        res.locals.redirect = `/users/${userId}`
        next()
      })
      .catch(error => {
        console.log(`Error removing logEntry by ID: ${error.message}`)
        req.flash('warning', `Error removing logEntry by ID: ${error.message}`)
        next()
      })
  },
  redirectView: (req, res, next) => {
    const redirectPath = res.locals.redirect
    if (redirectPath !== undefined) res.redirect(303, redirectPath)
    else next()
  }
}
