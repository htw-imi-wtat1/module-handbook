const router = require('express').Router()
const apiController = require('../controllers/apiController')
const coursesController = require('../controllers/coursesController')
const usersController = require('../controllers/usersController')

router.post('/login', usersController.apiAuthenticate)
router.get('/courses', coursesController.index, apiController.respondJSON)

router.use(usersController.verifyJWT)
router.get('/users', usersController.index, apiController.respondJSON)

router.use(apiController.errorJSON)
module.exports = router
