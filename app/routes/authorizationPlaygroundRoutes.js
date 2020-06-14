const router = require('express').Router()
const controller = require('../controllers/authorizationPlaygroundController')
const auth = require('../controllers/authorization')

router.get('/', controller.open, controller.htmlView)
router.get('/open', controller.open, controller.htmlView)
router.get('/failureRedirect', controller.open, controller.htmlView)

router.get('/requiresLogin',
  auth.requireLoggedIn(),
  controller.requiresLogin,
  controller.htmlView)

router.get('/requiresLoginWithRedirect',
  auth.requireLoggedIn({ failureRedirect: '/authorizationPlayground/failureRedirect' }),
  controller.requiresLogin,
  controller.htmlView)

router.get('/requiresLoginWithRedirectFlash',
  auth.requireLoggedIn({ flash: 'Unauthorized - Redirected.', failureRedirect: '/authorizationPlayground/failureRedirect' }),
  controller.requiresLogin,
  controller.htmlView)

router.get('/status',
  controller.status)

module.exports = router
