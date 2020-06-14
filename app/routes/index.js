const router = require('express').Router()
const express = require('express')

const userRoutes = require('./userRoutes')
const courseRoutes = require('./courseRoutes')
const homeRoutes = require('./homeRoutes')
const cookieRoutes = require('./cookieRoutes')
const apiRoutes = require('./apiRoutes')
const cookieController = require('../controllers/cookieController')
const authorizationPlaygroundRoutes = require('./authorizationPlaygroundRoutes')
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
if ((sessionSecret === devSessionSecret) && (process.env.NODE_ENV === 'production')) {
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

/*
router.use(function (req, res, next) {
  console.log('-------------------------------')
  console.log('Time:', Date.now())
  console.log(req.method + ' ' + req.url)
  console.log('authenticated: ' + req.isAuthenticated())
  if (typeof req.signedCookies === 'undefined') {
    console.log('no signed Cookies')
  } else {
    console.log('session id: ' + req.signedCookies['connect.sid'])
  }
  console.log(expressSession)
  // console.log('req.body ' + JSON.stringify(req.body))
  // console.log(req.headers)

  next()
})
*/
// from https://stackoverflow.com/questions/9285880/node-js-express-js-how-to-override-intercept-res-render-function
const menuItems = [
  { path: '/about', text: 'About' },
  { path: '/authorizationPlayground', text: 'Auth Playground' },
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
  res.locals.loggedIn = req.authProxyIsAuthenticated()
  res.locals.currentUser = req.authProxyUser()
  next()
})

router.use(cookieController.banner) // needs to go first, sets variables for cookieModal

router.use('/authorizationPlayground', authorizationPlaygroundRoutes)
router.use('/cookieBanner', cookieRoutes)

router.use('/courses', courseRoutes)
router.use('/users', userRoutes)
router.use('/api', apiRoutes)
router.use('/', homeRoutes)

router.get('/info', (req, res) => {
  res.send({
    NODE_ENV: process.env.NODE_ENV,
    loggedIn: res.locals.loggedIn,
    user: req.authProxyUser(),
    hallo: 'hallo'
  })
})
const errorController = require('../controllers/errorController')
router.use(errorController.pageNotFoundError)
router.use(errorController.internalServerError)

module.exports = router
