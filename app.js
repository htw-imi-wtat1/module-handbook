'use strict'

const express = require('express')
const app = express()
const homeController = require('./controllers/homeController')
const searchController = require('./controllers/searchController')
const errorController = require('./controllers/errorController')
const coursesController = require('./controllers/coursesController')
const layouts = require('express-ejs-layouts')
const path = require('path')

// const morgan = require('morgan')
// app.use(morgan(":method :url :status * :response-time ms"))

const mongodbURI = process.env.MONGODB_URI || ((process.env.NODE_ENV === 'test') ? 'mongodb://localhost:27017/modulehandbook_test_db' : 'mongodb://localhost:27017/modulehandbook_db')
const port = process.env.PORT || ((process.env.NODE_ENV === 'test') ? 30020 : 3002)

app.set('port', port)

const mongoose = require('mongoose')
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Successfully connected to MongoDB using Mongoose!')
})

app.set('view engine', 'ejs')
app.use(layouts)

app.use(
  express.urlencoded({
    extended: false
  })
)

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
app.get('/modules/:format?', homeController.showStudentView)
app.get('/about/', homeController.showAbout)
app.post('/about', searchController.search)
app.get('/', homeController.showIndex)

app.get('/courses', coursesController.getAllCourses)
app.get('/courses/create', coursesController.createCourse)
app.post('/courses', coursesController.saveCourse)
app.get('/courses/:id', coursesController.getCourse)

app.use(errorController.pageNotFoundError)
app.use(errorController.internalServerError)

module.exports = app