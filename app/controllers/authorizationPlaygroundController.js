'use strict'

module.exports = {
  open: (req, res, next) => {
    res.locals.action = 'open'
    next()
  },
  requiresLogin: (req, res, next) => {
    res.locals.action = 'requiresLogin'
    next()
  },
  status: (req, res, next) => {
    if (req.isAuthenticated()) {
      res.send(`Logged in: ${req.user.fullName}`)
    } else {
      res.send('Not logged in')
    }
  },
  htmlView: (req, res) => {
    res.locals.authorizationPlaygroundLinks = ['open', 'requiresLogin', 'requiresLoginWithRedirect', 'requiresLoginWithRedirectFlash', 'status']
    res.locals.user = req.user
    let sessionID = req.signedCookies['connect.sid']
    if (typeof sessionID === 'undefined') { sessionID = 'none' }
    res.locals.sessionID = sessionID
    res.locals.url = req.url
    res.locals.token = res.body.token
    res.render('authorizationPlayground/index')
  }

}
