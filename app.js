'use strict'

const express = require('express')
const app = express()
const homeController = require('./controllers/homeController')
const searchController = require('./controllers/searchController')
const errorController = require('./controllers/errorController')
const coursesController = require('./controllers/coursesController')
const usersController = require('./controllers/usersController')
const logEntriesController = require('./controllers/logEntriesController')
const layouts = require('express-ejs-layouts')
const path = require('path')
const methodOverride = require('method-override')
const router = express.Router()
const passport = require('passport')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const User = require('./models/user')
const connectFlash = require('connect-flash')

const devSessionSecret = 'non_secure_session_secret'
const sessionSecret = process.env.SESSION_SECRET || devSessionSecret
if (sessionSecret === devSessionSecret) {
  console.log('WARNING! using unsecure default SESSION_SECRET')
}
router.use(cookieParser(sessionSecret))
router.use(expressSession({
  secret: sessionSecret,
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

router.use(connectFlash())

const morgan = require('morgan')
app.use(morgan(':method :url :status * :response-time ms'))

app.set('view engine', 'ejs')

/*
app.use(function (req, res, next) {
  console.log('-------------------------------')
  console.log('Time:', Date.now())
  console.log(req.url)
  console.log(req.method)
  console.log('req.body ' + JSON.stringify(req.body))
  console.log(req.headers)
  next()
})
*/

app.use('/', router)

router.use(
  methodOverride('_method', {
    methods: ['POST', 'GET']
  })
)

router.use(layouts)

router.use(express.static(path.join(__dirname, '/public')))
router.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')))
router.use(express.static(path.join(__dirname, '/node_modules/jquery/dist')))
router.use(express.static(path.join(__dirname, '/node_modules/popper.js/dist')))

router.use(
  express.urlencoded({
    extended: false
  })
)
router.use(express.json())

// from https://stackoverflow.com/questions/9285880/node-js-express-js-how-to-override-intercept-res-render-function
const menuItems = [
  { path: '/modules/list', text: 'Module List' },
  { path: '/modules/tabular', text: 'Module Table' },
  { path: '/courses', text: 'Courses' },
  { path: '/users', text: 'Users' },
  { path: '/users/new', text: 'Register' },
  { path: '/about', text: 'About' }
]
router.use(function (req, res, next) {
  var _render = res.render
  res.render = function (view, options, fn) {
    const newOptions = { ...options, currentPath: req.path, menu_items: menuItems }
    _render.call(this, view, newOptions, fn)
  }
  next()
})
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash()
  res.locals.loggedIn = req.isAuthenticated()
  res.locals.currentUser = req.user
  next()
})

router.get('/modules/:format?', homeController.showStudentView)
router.get('/about', homeController.showAbout)
router.post('/about', searchController.search)

router.get('/courses', coursesController.index, usersController.indexView)
router.get('/courses/new', coursesController.new)
router.post('/courses', coursesController.create, usersController.redirectView)
// app.get('/courses/:id/edit', coursesController.edit)
// app.put('/courses/:id', coursesController.update, usersController.redirectView)
router.get('/courses/:id', coursesController.show, usersController.showView)
// app.delete('/courses/:id', coursesController.delete, usersController.redirectView)

router.get('/users/:id/log_entries/new', logEntriesController.new)
router.get('/users/:id/log_entries/:logEntryId/edit', logEntriesController.edit)
router.put('/users/:id/log_entries/:logEntryId', logEntriesController.update, logEntriesController.redirectView)
router.delete('/users/:id/log_entries/:logEntryId', logEntriesController.delete, logEntriesController.redirectView)
router.post('/users/:id/log_entries', logEntriesController.create, logEntriesController.redirectView)

router.get('/users/login', usersController.login)
router.post('/users/login', usersController.authenticate)
router.get('/users/logout', usersController.logout, usersController.redirectView)
router.get('/users', usersController.index, usersController.indexView)
router.get('/users/new', usersController.new)
router.post('/users', usersController.validations, usersController.create, usersController.redirectView)
router.get('/users/:id/edit', usersController.edit)
router.put('/users/:id', usersController.update, usersController.redirectView)
router.get('/users/:id', usersController.show, usersController.showView)
router.delete('/users/:id', usersController.delete, usersController.redirectView)

router.get('/', homeController.showIndex)

router.use(errorController.pageNotFoundError)
router.use(errorController.internalServerError)

module.exports = app
