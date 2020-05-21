'use strict'

const User = require('../models/user')
const Course = require('../models/course')

const getUserParams = body => {
  return {
    name: {
      first: body.first || (body.name && body.name.first),
      last: body.last || (body.name && body.name.last)
    },
    email: body.email,
    password: body.password,
    zipCode: body.zipCode
  }
}

module.exports = {
  create: (req, res, next) => {
    const userParams = getUserParams(req.body)
    // console.log('####### user: ' + userParams.email + " "+userParams.password)
    User.create(userParams)
      .then(user => {
        res.locals.redirect = '/users'
        res.locals.user = user
        next()
      })
      .catch(error => {
        console.log(`Error saving user: ${error.message}`)
        next(error)
      })
  },
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
        res.render('logEntries/new')
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
