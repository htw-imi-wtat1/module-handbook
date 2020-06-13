const router = require('express').Router()
const cookieController = require('../controllers/cookieController')

router.get('/OK', cookieController.bannerOK)
router.get('/SkipOnce', cookieController.bannerSkipOnce)
router.get('/deleteCookie', cookieController.deleteBannerCookie)

module.exports = router
