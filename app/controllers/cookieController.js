const httpStatus = require('http-status-codes')
const bannerCookieName = 'bannerCookie'
const bannerCookieOK = 'ok'
const bannerCookieSkipOnce = 'skipOnce'
const cookieLifeSpan = 1000 * 60 * 60 * 24

module.exports = {

  banner: (req, res, next) => {
    const bannerCookie = req.signedCookies[bannerCookieName]
    // console.log('BANNER COOKIE ' + bannerCookie)
    res.locals.cookieBannerOK = false
    if (bannerCookie === bannerCookieOK) {
      res.locals.cookieBannerOK = true
    }
    if (bannerCookie === bannerCookieSkipOnce) {
      res.locals.cookieBannerOK = true
      res.cookie(bannerCookieName, { maxAge: 0 })
    }
    next()
  },

  bannerOK: (req, res, next) => {
    res.cookie(bannerCookieName, 'ok', { maxAge: cookieLifeSpan, httpOnly: true, signed: true })
    // console.log('BANNER COOKIE SET: OK')
    res.json({ status: httpStatus.OK })
  },

  deleteBannerCookie: (req, res, next) => {
    res.cookie(bannerCookieName, { maxAge: 0 })
    // console.log('BANNER COOKIE DELETED')
    res.json({ status: httpStatus.OK })
  },

  bannerSkipOnce: (req, res, next) => {
    res.cookie(bannerCookieName, bannerCookieSkipOnce, { maxAge: cookieLifeSpan, httpOnly: true, signed: true })
    // console.log('BANNER COOKIE SKIP ONCE')
    res.json({ status: httpStatus.OK })
  }
}
