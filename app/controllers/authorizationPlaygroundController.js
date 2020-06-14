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
    if (req.authProxyIsAuthenticated()) {
      res.send(`Logged in: ${req.authProxyUser().fullName}`)
    } else {
      res.send('Not logged in')
    }
  },
  htmlView: (req, res) => {
    res.locals.authorizationPlaygroundLinks = ['open', 'requiresLogin', 'requiresLoginWithRedirect', 'requiresLoginWithRedirectFlash', 'status']
    res.locals.user = req.authProxyUser()
    let sessionID = req.signedCookies['connect.sid']
    if (typeof sessionID === 'undefined') { sessionID = 'none' }
    res.locals.sessionID = sessionID
    res.locals.url = req.url
    res.render('authorizationPlayground/index')
  }

}
