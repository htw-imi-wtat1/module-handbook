const router = require('express').Router()
const apiController = require('../controllers/apiController')
const coursesController = require('../controllers/coursesController')
const usersController = require('../controllers/usersController')

router.get('/courses', coursesController.index, apiController.respondJSON)
router.get('/users', usersController.index, apiController.respondJSON)
router.use(apiController.errorJSON)
module.exports = router
