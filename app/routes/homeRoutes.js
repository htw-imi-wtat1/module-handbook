const router = require('express').Router()
const homeController = require('../controllers/homeController')
const searchController = require('../controllers/searchController')

router.get('/modules/:format?', homeController.showStudentView)
router.get('/about', homeController.showAbout)
router.post('/about', searchController.search)

router.get('/chat', homeController.chat)
router.get('/', homeController.showIndex)
module.exports = router
