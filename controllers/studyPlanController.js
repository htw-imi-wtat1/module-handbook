'use strict'

const StudyPlan = require('../models/studyPlan')
const getStudyPlanParams = body => {
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
  index: (req, res, next) => {
    StudyPlan.find()
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
    res.render('studyPlan/index')
  },

  new: (req, res) => {
    res.render('studyPlan/new')
  },

  create: (req, res, next) => {
    const studyPlanParams = getStudyPlanParams(req.body)
    // console.log('####### user: ' + userParams.email + " "+userParams.password)
    User.create(studyPlanParams)
      .then(user => {
        res.locals.redirect = '/users'
        res.locals.user = user
        next()
      })
      .catch(error => {
        console.log(`Error saving studyPlan: ${error.message}`)
        next(error)
      })
  },

  redirectView: (req, res, next) => {
    const redirectPath = res.locals.redirect
    if (redirectPath !== undefined) res.redirect(redirectPath)
    else next()
  },

  show: (req, res, next) => {
    const studyPlanId = req.params.id
    StudyPlan.findById(studyPlanId)
      .then(studyPlan => {
        res.locals.studyPlan = studyPlan
        next()
      })
      .catch(error => {
        console.log(`Error fetching studyPlan by ID: ${error.message}`)
        next(error)
      })
  },

  showView: (req, res) => {
    res.render('studyPlan/show')
  },

  edit: (req, res, next) => {
    const userId = req.params.id
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
    // findOneAndUpdate
    /*
        User.findOneAndUpdate(userId, {
          $set: userParams
        }) */
    User.updateOne({ _id: userId }, userParams)
      .then(user => {
        res.locals.redirect = `/users/${userId}`
        res.locals.user = user
        next()
      })
      .catch(error => {
        console.log(`Error updating user by ID: ${error.message}`)
        next(error)
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
  }
}
