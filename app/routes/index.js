const router = require('express').Router()
const express = require('express')

const userRoutes = require('./userRoutes')
const courseRoutes = require('./courseRoutes')
const homeRoutes = require('./homeRoutes')
const cookieRoutes = require('./cookieRoutes')
const cookieController = require('../controllers/cookieController')

// const errorRoutes = require('./errorRoutes')

const layouts = require('express-ejs-layouts')
const path = require('path')
const methodOverride = require('method-override')

const passport = require('passport')

const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const connectFlash = require('connect-flash')

const devSessionSecret = 'non_secure_session_secret'
const sessionSecret = process.env.SESSION_SECRET || devSessionSecret
if (sessionSecret === devSessionSecret) {
  console.log('WARNING! using unsecure default SESSION_SECRET')
}

router.use(connectFlash())

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

router.use(
  methodOverride('_method', {
    methods: ['POST', 'GET']
  })
)

router.use(layouts)

router.use(express.static(path.join(__dirname, '../public')))
router.use(express.static(path.join(__dirname, '../../node_modules/bootstrap/dist')))
router.use(express.static(path.join(__dirname, '../../node_modules/jquery/dist')))
router.use(express.static(path.join(__dirname, '../../node_modules/popper.js/dist')))

router.use(
  express.urlencoded({
    extended: false
  })
)
router.use(express.json())

// from https://stackoverflow.com/questions/9285880/node-js-express-js-how-to-override-intercept-res-render-function
const menuItems = [
  { path: '/about', text: 'About' },
  { path: '/modules/list', text: 'Module List' },
  { path: '/modules/tabular', text: 'Module Table' },
  { path: '/courses', text: 'Courses' },
  { path: '/users', text: 'Users' },
  { path: '/users/new', text: 'Register' }
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

router.use(cookieController.banner)
router.use('/cookieBanner', cookieRoutes)

router.use('/courses', courseRoutes)
router.use('/users', userRoutes)
router.use('/', homeRoutes)

const errorController = require('../controllers/errorController')
router.use(errorController.pageNotFoundError)
router.use(errorController.internalServerError)

module.exports = router
