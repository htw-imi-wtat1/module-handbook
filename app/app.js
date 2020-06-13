'use strict'

const express = require('express')
const app = express()

const path = require('path')
const passport = require('passport')
const User = require('./models/user')
const helmet = require('helmet')
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'"],
    upgradeInsecureRequests: true
  }
}))

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

const router = require('./routes/index')
app.use('/', router)

module.exports = app

// const morgan = require('morgan')
// app.use(morgan(':method :url :status * :response-time ms'))

/*
app.use(function (req, res, next) {
  console.log('-------------------------------')
  console.log('Time:', Date.now())
  console.log(req.method + ' ' + req.url)
  // console.log('req.body ' + JSON.stringify(req.body))
  // console.log(req.headers)

  next()
})
*/
