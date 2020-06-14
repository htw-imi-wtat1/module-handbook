const router = require('express').Router()
const apiController = require('../controllers/apiController')
const coursesController = require('../controllers/coursesController')

router.get('/courses', coursesController.index, apiController.respondJSON)
router.use(apiController.errorJSON)
module.exports = router
