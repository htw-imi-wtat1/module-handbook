const router = require('express').Router()

const coursesController = require('../controllers/coursesController')
const usersController = require('../controllers/usersController')

router.get('/', coursesController.index, coursesController.indexView)
router.get('/new', coursesController.new)
router.post('', coursesController.create, usersController.redirectView)
// app.get('/:id/edit', coursesController.edit)
// app.put('/:id', coursesController.update, usersController.redirectView)
router.get('/:id', coursesController.show, usersController.showView)
// app.delete('/:id', coursesController.delete, usersController.redirectView)

module.exports = router
