'use strict'

const express = require('express')
const app = express()
const homeController = require('./controllers/homeController')
const searchController = require('./controllers/searchController')
const errorController = require('./controllers/errorController')
const coursesController = require('./controllers/coursesController')
const layouts = require('express-ejs-layouts')
const path = require('path')
const methodOverride = require('method-override')

// const morgan = require('morgan')
// app.use(morgan(":method :url :status * :response-time ms"))

const port = process.env.PORT || ((process.env.NODE_ENV === 'test') ? 30020 : 3002)

app.set('port', port)

app.set('view engine', 'ejs')
app.use(layouts)

app.use(
  express.urlencoded({
    extended: false
  })
)
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

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')))
app.use(express.static(path.join(__dirname, '/node_modules/jquery/dist')))
app.use(express.static(path.join(__dirname, '/node_modules/popper.js/dist')))

app.use(express.json())

// from https://stackoverflow.com/questions/9285880/node-js-express-js-how-to-override-intercept-res-render-function
const menuItems = [
  { path: '/modules/list', text: 'Module List' },
  { path: '/modules/tabular', text: 'Module Table' },
  { path: '/courses', text: 'Courses' },
  { path: '/users', text: 'Users' },
  { path: '/about', text: 'About' }
]
app.use(function (req, res, next) {
  var _render = res.render
  res.render = function (view, options, fn) {
    const newOptions = { ...options, currentPath: req.path, menu_items: menuItems }
    _render.call(this, view, newOptions, fn)
  }
  next()
})

app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET']
  })
)

app.get('/modules/:format?', homeController.showStudentView)
app.get('/about/', homeController.showAbout)
app.post('/about', searchController.search)

app.get('/courses', coursesController.getAllCourses)
app.get('/courses/create', coursesController.createCourse)
app.post('/courses', coursesController.saveCourse)
app.get('/courses/:id', coursesController.getCourse)

// const User = require('./models/user')
const usersController = require('./controllers/usersController')
app.get('/users', usersController.index, usersController.indexView)
app.get('/users/new', usersController.new)
app.post('/users/create', usersController.create, usersController.redirectView)
app.get('/users/:id/edit', usersController.edit)
app.put('/users/:id/update', usersController.update, usersController.redirectView)
app.get('/users/:id', usersController.show, usersController.showView)
app.delete('/users/:id/delete', usersController.delete, usersController.redirectView)
app.get('/', homeController.showIndex)

app.use(errorController.pageNotFoundError)
app.use(errorController.internalServerError)

module.exports = app
