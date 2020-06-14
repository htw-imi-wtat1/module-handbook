const httpStatus = require('http-status-codes')
module.exports = {
  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals
    })
  },
  errorJSON: (error, req, res, next) => {
    let errorObject
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      }
    } else {
      errorObject = {
        status: httpStatus.OK,
        message: 'Unknown Error.'

      }
    }
    res.json(errorObject)
  }
}
