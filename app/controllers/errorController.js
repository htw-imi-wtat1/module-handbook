'use strict'

const httpStatus = require('http-status-codes')

exports.pageNotFoundError = (req, res) => {
  const errorCode = httpStatus.NOT_FOUND
  res.status(errorCode)
  res.send(`${errorCode} | Page or resource not found!`)
}

exports.internalServerError = (error, req, res, next) => {
  const errorCode = httpStatus.INTERNAL_SERVER_ERROR
  console.log(`ERROR occurred: ${error.stack}`)
  res.status(errorCode)
  res.send(`${errorCode} | Sorry, our application is taking a nap!`)
}
