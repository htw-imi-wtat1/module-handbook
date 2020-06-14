'use strict;'

const User = require('../../app/models/user')
const { randomUserData } = require('./userData')

// note that the login doesn't create a User object if not asked to but just
// provides the plain user data object
module.exports = {
  loginProxy: async (app, createUser = false, userData = randomUserData()) => {
    let user = userData
    if (createUser) {
      user = await User.create(userData)
    }
    app.request.authProxyUser = function () {
      return user
    }
    app.request.authProxyIsAuthenticated = function () {
      return true
    }
    return user
  },

  logoutProxy: (app) => {
    app.request.authProxyUser = function () {
      return null
    }
    app.request.authProxyIsAuthenticated = function () {
      return false
    }
  }
}
