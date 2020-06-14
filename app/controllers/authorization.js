'use strict'

const httpStatus = require('http-status-codes')
module.exports = {
  requireLoggedIn: (options = {}) => {
    return (req, res, next) => {
      if (req.authProxyIsAuthenticated()) {
        next()
      } else {
        if (options.flash !== undefined) {
          req.flash('warning', options.flash)
        }
        if (options.failureRedirect !== undefined) {
          res.redirect(303, options.failureRedirect)
        } else {
          const errorCode = httpStatus.UNAUTHORIZED
          res.status(errorCode)
          res.send(`${errorCode} | Unauthorized!`)
        }
      }
    }
  }
}
