'use strict;'

// use these proxy functions to check if and which user is logged in.
// - easy to exchange the authentication framework/strategy
// - easy to overwrite in tests
function defineProxy (app) {
  app.request.authProxyUser = function () {
    return this.user
  }
  app.request.authProxyIsAuthenticated = function () {
    return this.isAuthenticated()
  }
}
module.exports = { defineProxy: defineProxy }
