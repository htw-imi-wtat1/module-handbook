'use strict'

const httpStatus = require('http-status-codes')
const User = require('../models/user')
const { dateViewFormat } = require('../helper/date')
const { classForState } = require('../helper/state')
const passport = require('passport')
const { body, check, validationResult } = require('express-validator')

const getUserParams = body => {
  return {
    name: {
      first: body.first || (body.name && body.name.first),
      last: body.last || (body.name && body.name.last)
    },
    email: body.email,
    zipCode: body.zipCode
  }
}

module.exports = {
  index: (req, res, next) => {
    User.find()
      .sort({ 'name.last': 'asc' })
      .then(users => {
        res.locals.users = users
        next()
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`)
        next(error)
      })
  },
  indexView: (req, res) => {
    res.render('users/index')
  },

  new: (req, res) => {
    res.locals.user = new User()
    res.render('users/new')
  },

  create: (req, res, next) => {
    if (req.skip) next()
    const userParams = getUserParams(req.body)
    const newUser = new User(userParams)
    User.register(newUser, req.body.password, (e, user) => {
      if (user) {
        req.flash('success', `${user.fullName}'s account created succesfully!`)
        res.locals.redirect = '/users'
        next()
      } else {
        req.flash('danger', `failed to create user account because: ${e.message}`)
        res.locals.user = newUser
        // res.locals.redirect = '/users/new'
        // next()
        res.render('users/new')
      }
    })
  },

  redirectView: (req, res, next) => {
    const redirectPath = res.locals.redirect
    if (redirectPath !== undefined) res.redirect(303, redirectPath)
    else next()
  },

  show: (req, res, next) => {
    const userId = req.params.id
    User.findById(userId)
      .then(user => {
        res.locals.user = user
        res.locals.dateViewFormat = dateViewFormat
        res.locals.classForState = classForState
        next()
      })

      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`)
        next(error)
      })
  },

  showView: (req, res) => {
    res.render('users/show')
  },

  edit: (req, res, next) => {
    const userId = req.params.id
    res.locals.userParams = {}
    User.findById(userId)
      .then(user => {
        res.render('users/edit', {
          user: user
        })
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`)
        next(error)
      })
  },

  update: (req, res, next) => {
    const userId = req.params.id
    const userParams = getUserParams(req.body)

    User.updateOne({ _id: userId }, userParams)
      .then(user => {
        res.locals.redirect = `/users/${userId}`
        res.locals.user = user
        next()
      })
      .catch(error => {
        console.log('could not save user: ' + error.message)
        req.flash('error', `Error updating user by ID: ${error.message}`)
        res.locals.redirect = `/users/${userId}/edit`
        next()
      })
  },

  delete: (req, res, next) => {
    const userId = req.params.id
    User.findByIdAndRemove(userId)
      .then(() => {
        res.locals.redirect = '/users'
        next()
      })
      .catch(error => {
        console.log(`Error deleting user by ID: ${error.message}`)
        next()
      })
  },

  validations: [
    body('email')
      .normalizeEmail({ all_lowercase: true })
      .trim(),
    check('email', 'Email is invalid')
      .isEmail(),
    check('zipCode', 'Zip code is invalid')
      .notEmpty()
      .isInt()
      .isLength({ min: 5, max: 5 }),
    (req, res, next) => {
      const result = validationResult(req)
      const hasErrors = !result.isEmpty()
      if (hasErrors) {
        const messages = result.array().map(e => e.msg)
        req.skip = true
        req.flash('error', messages.join(' and '))
        res.locals.redirect = '/users/new'
        next()
      } else {
        next()
      }
    }],

  login: (req, res) => {
    res.render('users/login')
  },

  logout: (req, res, next) => {
    req.logout()
    req.flash('success', 'You have been logged out!')
    res.locals.redirect = '/'
    next()
  },

  authenticate: passport.authenticate('local', {
    failureRedirect: '/users/login',
    failureFlash: 'Failed to login.',
    successRedirect: '/',
    successFlash: 'Logged in!'
  })
}
